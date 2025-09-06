package com.code.server.controller;

import com.code.server.dto.member.MemberDto;
import com.code.server.dto.member.MemberMapper;
import com.code.server.service.member.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {

    private final MemberMapper  memberMapper;

    @GetMapping
    public ResponseEntity<MemberDto> getMember(@AuthenticationPrincipal CustomUserDetails principal) {
        return ResponseEntity.ok(memberMapper.toDTO(principal.getMember()));
    }
}
