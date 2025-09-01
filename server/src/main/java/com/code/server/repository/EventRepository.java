package com.code.server.repository;

import com.code.server.entity.Event;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {
    @Query(
            value = "SELECT * FROM events WHERE events.published = true ORDER BY events.published_at LIMIT :limit OFFSET :offset",
            nativeQuery = true
    )
    List<Event> getPage(@Param("limit") Integer limit, @Param("offset") Integer offset);
}
