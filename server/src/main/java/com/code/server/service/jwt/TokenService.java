package com.code.server.service.jwt;

import com.code.server.dto.auth.LoginRequest;
import com.code.server.entity.Member;
import com.code.server.exception.Unauthorized;
import com.code.server.service.member.MemberEntityService;
import com.code.server.service.member.security.CustomUserDetails;
import com.code.server.service.member.security.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final JwtEncoder jwtEncoder;
    private final MemberEntityService memberEntityService;
    private final CustomUserDetailsService customUserDetailsService;
    private final PasswordEncoder passwordEncoder;

    public Token generateToken(Authentication authentication) {
        Instant now = Instant.now();
        String accessTokenScope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        JwtClaimsSet accessTokenClaims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(authentication.getName())
                .claim("scope", accessTokenScope)
                .build();

        JwtClaimsSet refreshTokenClaims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(7, ChronoUnit.DAYS))
                .subject(authentication.getName())
                .build();

        Token token = Token.builder()
                .access_token(this.jwtEncoder.encode(JwtEncoderParameters.from(accessTokenClaims)).getTokenValue())
                .expires_at(now.plus(1, ChronoUnit.HOURS))
                .refresh_token(this.jwtEncoder.encode(JwtEncoderParameters.from(refreshTokenClaims)).getTokenValue())
                .build();

        // updating the member
        memberEntityService.addRefreshToken(authentication.getName(), token.getRefresh_token());
        return token;
    }

    public Token refreshToken(String refreshToken) {
        Member member = memberEntityService.findByRefreshToken(refreshToken);
        Authentication authentication = new UsernamePasswordAuthenticationToken(member.getEmail(), null);
        Token token = generateToken(authentication);

        // changing the users token
        memberEntityService.addRefreshToken(member.getEmail(), token.getRefresh_token());
        return token;
    }

    public void revokeToken(CustomUserDetails user) {
        memberEntityService.revokeRefreshToken(user.getMember().getEmail());
    }

    public Token login(LoginRequest loginRequest) {
        // checking credentials
        CustomUserDetails userDetails = (CustomUserDetails) customUserDetailsService.loadUserByUsername(loginRequest.getEmail());
        if (userDetails == null) {
            throw new Unauthorized("Invalid Credentials");
        }
        if (!passwordEncoder.matches(loginRequest.getPassword(), userDetails.getPassword())) {
            throw new Unauthorized("Invalid Credentials");
        }
        if (!userDetails.getMember().getActivated()) {
            throw new Unauthorized("Account not active");
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());
        return generateToken(authentication);
    }
}
