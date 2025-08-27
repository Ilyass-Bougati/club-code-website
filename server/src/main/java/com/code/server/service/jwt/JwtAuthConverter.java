package com.code.server.service.jwt;

import com.code.server.entity.Member;
import com.code.server.service.member.MemberEntityService;
import com.code.server.service.member.security.CustomUserDetails;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;


@Component
public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
    private final MemberEntityService memberEntityService;

    public JwtAuthConverter(MemberEntityService memberEntityService) {
        this.memberEntityService = memberEntityService;
    }

    @Override
    public AbstractAuthenticationToken convert(@NonNull Jwt jwt) {
        Member member = memberEntityService.findByEmail(jwt.getSubject());
        CustomUserDetails user = new CustomUserDetails(member);
        return new UsernamePasswordAuthenticationToken(user, "N/A", user.getAuthorities());
    }
}
