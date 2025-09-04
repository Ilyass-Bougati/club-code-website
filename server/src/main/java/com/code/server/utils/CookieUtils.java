package com.code.server.utils;

import org.springframework.http.ResponseCookie;

public class CookieUtils {

    /**
     * This function is to return the access token and the refresh token
     * @param key meant to be either `access_token` or `refresh_token`
     * @param value the value of the token
     * @param maxAge the maximum age of the cookie
     * @param path the path that the cookie will be sent on
     * @return the cookie :>
     */
    public static ResponseCookie genCookie(String key, String value, long maxAge, String path) {
        return ResponseCookie.from(key, value)
                .httpOnly(true)
                .secure(true)
                .path(path)
                .maxAge(maxAge)
                .sameSite("Strict")
                .build();
    }
}
