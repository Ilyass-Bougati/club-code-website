package com.code.server.dto.member;

import com.code.server.entity.Event;
import com.code.server.entity.Member;
import com.code.server.service.event.EventEntityService;
import com.code.server.service.event.EventService;
import com.code.server.service.member.MemberEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberMapperImpl implements MemberMapper {

    private final MemberEntityService memberEntityService;

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
                // returning the joined events
                .joinedEvents(
                        memberEntityService.getMemberJoinedEvents(member.getEmail())
                                .stream()
                                .map(Event::getId)
                                .toList()
                )
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
