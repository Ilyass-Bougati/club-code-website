package com.code.server.config;

import com.code.server.service.member.security.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;

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
                .requestMatchers(HttpMethod.POST, "/api/v1/register").permitAll()
                .anyRequest().hasRole("ADMIN");
        });

        // configuring the UserDetailsService
        http.userDetailsService(customUserDetailsService);

        http.httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
