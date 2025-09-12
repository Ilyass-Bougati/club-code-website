package com.code.server.service.member;

import com.code.server.entity.Member;
import com.code.server.service.CrudEntityService;

import java.util.UUID;

public interface MemberEntityService extends CrudEntityService<Member, UUID> {
    Member findByEmail(String email);
    Member findByRefreshToken(String refreshToken);
    void addRefreshToken(String email, String refreshToken);
    void revokeRefreshToken(String email);
    void activateMember(String email);
}
