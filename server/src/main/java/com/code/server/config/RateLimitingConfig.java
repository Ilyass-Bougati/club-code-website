package com.code.server.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class RateLimitingConfig {
    @Bean
    public Bucket bucket() {
        // Define the bandwidth with a limit of 5 tokens, refilled every minute
        Bandwidth limit = Bandwidth.builder()
                .capacity(100)
                .refillGreedy(10, Duration.ofMinutes(1))
                .build();
        return Bucket.builder().addLimit(limit).build();
    }
}
