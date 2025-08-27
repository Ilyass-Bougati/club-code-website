package com.code.server.service.jwt;

import lombok.*;

import java.time.Instant;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Token {
    String access_token;
    Instant expires_at;
    String refresh_token;
    @Builder.Default
    String token_type = "Bearer";
}
