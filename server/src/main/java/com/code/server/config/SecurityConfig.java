package com.code.server.config;

import com.code.server.service.member.security.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;

    private final JwtCookieFilter jwtCookieFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Note: CSRF disabled for simplicity for admin forms; consider enabling with tokens in production
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> request
                        // static assets and public pages
                        .requestMatchers("/css/**", "/js/**", "/images/**").permitAll()
                        // swagger
                        .requestMatchers("/v3/**").permitAll()
                        .requestMatchers("/swagger").permitAll()
                        .requestMatchers("/swagger-ui/*").permitAll()
                        // auth API
                        .requestMatchers("/api/v1/auth/logout").authenticated()
                        .requestMatchers("/api/v1/member").authenticated()
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        // actuator
                        .requestMatchers("/actuator/**").permitAll()
                        // public read APIs
                        .requestMatchers(HttpMethod.GET, "/api/v1/**").permitAll()
                        // admin login page and processing
                        .requestMatchers("/admin/login").permitAll()
                        // everything else under admin requires ADMIN role
                        .requestMatchers("/admin/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .anyRequest().hasAnyRole("ADMIN", "SUPER_ADMIN")
                )
                .formLogin(form -> form
                        .loginPage("/admin/login")
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl("/admin/dashboard", true)
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/admin/login?logout")
                        .permitAll()
                )
                // configuring the UserDetailsService
                .userDetailsService(customUserDetailsService)
                .httpBasic(Customizer.withDefaults())
                // Allow sessions for form login
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .addFilterBefore(jwtCookieFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
