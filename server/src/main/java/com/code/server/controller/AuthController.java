package com.code.server.controller;

import com.code.server.dto.auth.LoginRequest;
import com.code.server.dto.auth.RegistrationOpenResponse;
import com.code.server.service.jwt.Token;
import com.code.server.service.jwt.TokenService;
import com.code.server.dto.member.MemberRegisterRequest;
import com.code.server.service.member.MemberService;
import com.code.server.service.member.security.CustomUserDetails;
import com.code.server.utils.CookieUtils;
import com.code.server.utils.Registration;
import io.micrometer.core.annotation.Timed;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final TokenService tokenService;
    private final MemberService memberService;

    @GetMapping("/registration")
    public ResponseEntity<RegistrationOpenResponse> checkRegistration() {
        RegistrationOpenResponse res = new RegistrationOpenResponse(Registration.getRegistrationOpen());
        return ResponseEntity.ok(res);
    }

    @Timed(value = "auth.login", description = "The time it takes for login")
    @PostMapping("/login")
    public ResponseEntity<?> token(@RequestBody @Valid LoginRequest loginRequest) {
        Token token = tokenService.login(loginRequest);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, CookieUtils.genCookie("access_token", token.getAccess_token(), 60 * 60, "/").toString())
                .header(HttpHeaders.SET_COOKIE, CookieUtils.genCookie("refresh_token", token.getRefresh_token(), 60 * 60 * 24 * 7, "/api/v1/auth/refresh").toString())
                .body(Map.of("message", "Logged in successfully"));
    }

    @Timed(value = "auth.refresh", description = "The time it takes for refresh the token")
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue(name = "refresh_token", required = true) String refreshToken) {
        Token token = tokenService.refreshToken(refreshToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, CookieUtils.genCookie("access_token", token.getAccess_token(), 60 * 60, "/").toString())
                .header(HttpHeaders.SET_COOKIE, CookieUtils.genCookie("refresh_token", token.getRefresh_token(), 60 * 60 * 24 * 7, "/api/v1/auth/refresh").toString())
                .body(Map.of("message", "Refresh in successfully"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal CustomUserDetails principal) {
        tokenService.revokeToken(principal);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, CookieUtils.genCookie("access_token", "", 0, "/").toString())
                .header(HttpHeaders.SET_COOKIE, CookieUtils.genCookie("refresh_token", "", 0, "/").toString())
                .body(Map.of("message", "Logout successfully"));
    }

    @Timed(value = "auth.register", description = "The time it takes to register a new user")
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public void saveClient(Principal principal, @RequestBody @Valid MemberRegisterRequest registerRequest) {
        if (principal != null) {
            throw new RuntimeException("Already logged in");
        }
        memberService.register(registerRequest);
    }

}
