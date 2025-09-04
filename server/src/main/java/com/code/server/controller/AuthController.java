package com.code.server.controller;

import com.code.server.dto.auth.LoginRequest;
import com.code.server.dto.auth.RegistrationOpenResponse;
import com.code.server.service.jwt.Token;
import com.code.server.service.jwt.TokenService;
import com.code.server.dto.member.MemberRegisterRequest;
import com.code.server.dto.member.RefreshRequest;
import com.code.server.service.member.MemberService;
import com.code.server.service.member.security.CustomUserDetails;
import com.code.server.service.metrics.MetricsService;
import com.code.server.utils.Registration;
import io.micrometer.core.instrument.Counter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final TokenService tokenService;
    private final MemberService memberService;
    private final MetricsService metricsService;

    @GetMapping("/registration")
    public ResponseEntity<RegistrationOpenResponse> checkRegistration() {
        RegistrationOpenResponse res = new RegistrationOpenResponse(Registration.getRegistrationOpen());
        return ResponseEntity.ok(res);
    }

    @PostMapping("/login")
    public ResponseEntity<Token> token(@RequestBody @Valid LoginRequest loginRequest) {
        metricsService.countLogin();
        Authentication authentication = new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(tokenService.generateToken(authentication));
    }

    @PostMapping("/refresh")
    public ResponseEntity<Token> refreshToken(@RequestBody RefreshRequest request) {
        metricsService.countRefresh();
        return ResponseEntity.ok(tokenService.refreshToken(request.getRefreshToken()));
    }

    @PostMapping("/logout")
    public void logout(@AuthenticationPrincipal CustomUserDetails principal) {
        tokenService.revokeToken(principal);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public void saveClient(Principal principal, @RequestBody @Valid MemberRegisterRequest registerRequest) {
        if (principal != null) {
            throw new RuntimeException("Already logged in");
        }
        metricsService.countRegister();
        memberService.register(registerRequest);
    }

}
