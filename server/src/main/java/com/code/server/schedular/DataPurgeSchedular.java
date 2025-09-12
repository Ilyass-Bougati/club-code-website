package com.code.server.schedular;

import com.code.server.service.event.EventService;
import com.code.server.service.news.NewsService;
import io.micrometer.core.annotation.Timed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataPurgeSchedular {

    private final EventService eventService;
    private final NewsService newsService;

    @Timed(value = "scheduled.deleteOldEvents", description = "Time taken run the scheduled job for deleting old events")
    @Scheduled(cron = "0 0 12 * * *", zone = "Africa/Casablanca")
    public void deleteOldEvents() {
        eventService.deleteOldEvents();
        log.info("Old events deleted successfully");
    }

    @Timed(value = "scheduled.deleteOldNews", description = "Time taken run the scheduled job for deleting old news")
    @Scheduled(cron = "0 0 12 * * *", zone = "Africa/Casablanca")
    public void deleteOldNews() {
        newsService.deleteOldNews();
        log.info("Old news deleted successfully");
    }
}
