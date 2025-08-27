package com.code.server.service.member;

import com.code.server.entity.Member;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

// TODO : This could be cached later
@Service
@RequiredArgsConstructor
public class MemberEntityServiceImpl implements MemberEntityService {

    private final MemberRepository memberRepository;

    @Override
    @Transactional(readOnly = true)
    public Member findById(UUID uuid) {
        return memberRepository.findById(uuid)
                .orElseThrow(() -> new NotFoundException("Staff not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Staff not found"));
    }
}
