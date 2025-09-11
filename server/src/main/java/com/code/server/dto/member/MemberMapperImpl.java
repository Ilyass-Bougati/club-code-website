package com.code.server.dto.member;

import com.code.server.entity.Member;
import org.springframework.stereotype.Service;

@Service
public class MemberMapperImpl implements MemberMapper {
    @Override
    public MemberDto toDTO(Member member) {
        return MemberDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .phoneNumber(member.getPhoneNumber())
                .firstName(member.getFirstName())
                .lastName(member.getLastName())
                .createdAt(member.getCreatedAt())
                .activated(member.getActivated())
                .build();
    }


    @Override
    public Member toEntity(MemberDto memberDto) {
        return Member.builder()
                .email(memberDto.getEmail())
                .phoneNumber(memberDto.getPhoneNumber())
                .firstName(memberDto.getFirstName())
                .createdAt(memberDto.getCreatedAt())
                .lastName(memberDto.getLastName())
                .build();
    }
}
