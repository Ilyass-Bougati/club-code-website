package com.code.server.service.officeMember;

import com.code.server.dto.officeMember.OfficeMemberDto;
import com.code.server.service.CrudDtoService;

import java.util.List;
import java.util.UUID;

public interface OfficeMemberService extends CrudDtoService<UUID, OfficeMemberDto> {
    public List<OfficeMemberDto> findAll();
}
