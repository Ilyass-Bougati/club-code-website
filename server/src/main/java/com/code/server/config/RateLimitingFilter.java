package com.code.server.config;

import io.github.bucket4j.Bucket;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;


@Component
@RequiredArgsConstructor
public class RateLimitingFilter implements Filter {

    private final Bucket bucket;

    /**
     * Intercepts incoming requests and applies rate limiting.
     * If a token is available, the request is processed; otherwise, a 429 status code is returned.
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if (bucket.tryConsume(1)) {
            chain.doFilter(request, response); // Forward the request if rate limiting is not hit
        } else {
            ((HttpServletResponse) response).setStatus(429); // Return 429 if rate limit is exceeded
        }
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization code if needed
    }

    @Override
    public void destroy() {
        // Cleanup code if needed
    }
}
