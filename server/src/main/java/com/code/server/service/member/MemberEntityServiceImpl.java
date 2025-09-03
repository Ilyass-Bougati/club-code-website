package com.code.server.service.member;

import com.code.server.entity.Member;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.MemberRepository;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.UUID;

// TODO : This could be cached later
@Service
@Validated
@Transactional
@RequiredArgsConstructor
public class MemberEntityServiceImpl implements MemberEntityService {

    private final MemberRepository memberRepository;

    @Override
    @Transactional(readOnly = true)
    public Member findById(@NotNull(message = "Member Id can't be null") UUID uuid) {
        return memberRepository.findById(uuid)
                .orElseThrow(() -> new NotFoundException("Member not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Member not found"));
    }

    @Override
    public Member findByRefreshToken(String refreshToken) {
        return memberRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new NotFoundException("Member not found"));
    }

    @Override
    public void addRefreshToken(String email, String refreshToken) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Member not found"));
        member.setRefreshToken(refreshToken);
        memberRepository.save(member);
    }

    @Override
    public void revokeRefreshToken(String email) {
        addRefreshToken(email, null);
    }
}
