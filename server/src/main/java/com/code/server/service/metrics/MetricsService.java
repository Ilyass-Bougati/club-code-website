package com.code.server.service.metrics;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Component;

@Component
public class MetricsService {

    private final Counter loginCounter;
    private final Counter registerCounter;
    private final Counter refreshCounter;

    public MetricsService(MeterRegistry registry) {
        this.loginCounter = Counter.builder("login_counter")
                .tags("type", "auth")
                .description("Counts how many logins were made")
                .register(registry);

        this.registerCounter = Counter.builder("register_counter")
                .tags("type", "auth")
                .description("Counts how many registers made")
                .register(registry);

        this.refreshCounter = Counter.builder("refresh_counter")
                .tags("type", "auth")
                .description("Counts how many times users refreshed their tokens")
                .register(registry);
    }

    public void countLogin() {
        loginCounter.increment();
    }

    public void countRegister() {
        registerCounter.increment();
    }

    public void countRefresh() {
        refreshCounter.increment();
    }
}
