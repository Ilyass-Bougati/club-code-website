package com.code.server.service.member.security;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

@Getter
@Setter
@RequiredArgsConstructor
public class MemberGrantedAuthority implements GrantedAuthority {

    private final String role;

    @Override
    public String getAuthority() {
        return "ROLE_" + role;
    }
}
