package com.code.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Note that this is not safe, CSRF shouldn't be disabled but should be configured
        // But it's fine since we're disabling session management
        http.csrf(AbstractHttpConfigurer::disable);
        http.authorizeHttpRequests(request -> {request
                // for swagger
                .requestMatchers("/v3/**").permitAll()
                .requestMatchers("/swagger").permitAll()
                .requestMatchers("/swagger-ui/*").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/**").permitAll()
                .anyRequest().hasRole("ADMIN");
        });

        return http.build();
    }
}
