package com.code.server.controller;

import com.code.server.config.Token;
import com.code.server.config.TokenService;
import com.code.server.dto.member.MemberRegisterRequest;
import com.code.server.entity.Member;
import com.code.server.service.member.MemberEntityService;
import com.code.server.service.member.MemberService;
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
    private final MemberEntityService memberEntityService;

    @PostMapping("/login")
    public ResponseEntity<Token> token(Authentication authentication) {
        return ResponseEntity.ok(tokenService.generateToken(authentication));
    }

    @PostMapping("/refresh")
    public ResponseEntity<Token> refreshToken(Principal principal) {
        Member member = memberEntityService.findByEmail(principal.getName());
        Authentication authentication = new UsernamePasswordAuthenticationToken(member.getEmail(), null);
        return ResponseEntity.ok(tokenService.generateToken(authentication));
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public void saveClient(Authentication authentication, @RequestBody @Valid MemberRegisterRequest registerRequest) {
        memberService.register(registerRequest);
    }

}
