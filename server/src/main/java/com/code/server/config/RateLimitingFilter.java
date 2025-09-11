package com.code.server.config;

import com.code.server.service.allowedAdminIp.AllowedAdminIpEntityService;
import com.code.server.utils.IpUtils;
import io.github.bucket4j.Bucket;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class RateLimitingFilter extends OncePerRequestFilter {

    private final Bucket bucket;
    private final AllowedAdminIpEntityService allowedAdminIpEntityService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        String clientIp = IpUtils.getClientIp(request);

        // Exclude certain routes
        if (path.startsWith("/admin")) {
//            if (!allowedAdminIpEntityService.ipExists(clientIp)) {
//                if (!IpUtils.adminReachTries.containsKey(clientIp)) {
//                    IpUtils.adminReachTries.put(clientIp, LocalDateTime.now());
//                    log.info("Admin was reached by {}", clientIp);
//                }
//                response.setStatus(403); // Unauthorized
//                return;
//            }
            filterChain.doFilter(request, response);
            return;
        }

        // Apply rate limiting
        if (bucket.tryConsume(1)) {
            filterChain.doFilter(request, response);
        } else {
            log.warn("Client {} is overwhelming the backend", clientIp);
            response.setStatus(429); // Too Many Requests
            response.getWriter().write("Too many requests - try again later");
        }
    }
}
