package com.code.server.properties;


import org.springframework.boot.context.properties.ConfigurationProperties;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@ConfigurationProperties(prefix = "jwt")
public record JwtProperties(
        RSAPublicKey accessTokenPublicKey,
        RSAPublicKey refreshTokenPublicKey,
        RSAPrivateKey accessTokenPrivateKey,
        RSAPrivateKey refreshTokenPrivateKey
) {

}
