package com.code.server.service.member;

import com.code.server.entity.Event;
import com.code.server.entity.Member;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.MemberRepository;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Set;
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
    public Member findById(@NotNull UUID uuid) {
        return memberRepository.findById(uuid)
                .orElseThrow(() -> new NotFoundException("Member not found"));
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "memberCache", key = "#email")
    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Member not found"));
    }

    @Override
    @Transactional
    @CacheEvict(value = "memberCache", key = "#email")
    public void activateMember(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Member not found"));
        member.setActivated(true);
        memberRepository.save(member);
    }

    @Override
    public Set<Event> getMemberJoinedEvents(String email) {
        Member member = findByEmail(email);
        return member.getInterestEvents();
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
