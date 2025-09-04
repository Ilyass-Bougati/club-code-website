package com.code.server.service.member;

import com.code.server.dto.member.MemberDto;
import com.code.server.dto.member.MemberRegisterRequest;
import com.code.server.entity.Member;
import com.code.server.service.CrudDtoService;

import java.util.UUID;

public interface MemberService extends CrudDtoService<UUID, MemberDto> {
    MemberDto register(MemberRegisterRequest request);
    void registerMember(Member member, UUID eventId);
}
