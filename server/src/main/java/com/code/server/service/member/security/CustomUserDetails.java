package com.code.server.service.member.security;

import com.code.server.entity.Member;
import com.code.server.enums.UserRole;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {

    private final Member member;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<MemberGrantedAuthority> staffGrantedAuthorities = new ArrayList<>();
        staffGrantedAuthorities.add(new MemberGrantedAuthority("ADMIN"));

        if (member.getRole() == UserRole.SUPER_ADMIN) {
            staffGrantedAuthorities.add(new MemberGrantedAuthority("SUPER_ADMIN"));
        }

        return staffGrantedAuthorities;
    }

    @Override
    public String getPassword() {
        return member.getPassword();
    }

    @Override
    public String getUsername() {
        return member.getEmail();
    }
}
