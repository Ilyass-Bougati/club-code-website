package com.code.server.service.event.admin;

import com.code.server.dto.event.AdminEventDto;
import com.code.server.dto.member.MemberDto;
import com.code.server.service.CrudEntityService;

import java.util.List;
import java.util.UUID;

public interface AdminEventService extends CrudEntityService<AdminEventDto, UUID> {
    List<AdminEventDto> findAll();
    AdminEventDto findById(UUID id);
    AdminEventDto save(AdminEventDto dto);
    AdminEventDto update(AdminEventDto dto);
    void delete(UUID id);
    
    // Member management methods
    List<MemberDto> getEventMembers(UUID eventId);
    void addMemberToEvent(UUID eventId, UUID memberId);
    void removeMemberFromEvent(UUID eventId, UUID memberId);
    List<MemberDto> getAvailableMembers(UUID eventId);
}
