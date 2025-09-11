package com.code.server.repository;

import com.code.server.entity.Event;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {
    @Transactional(readOnly = true)
    @Query(
            value = "SELECT * FROM event WHERE event.published = true ORDER BY event.published_at LIMIT :limit OFFSET :offset",
            nativeQuery = true
    )
    List<Event> getPage(@Param("limit") Integer limit, @Param("offset") Integer offset);

    @Transactional
    @Modifying
    @Query("DELETE FROM Event e WHERE e.registrationDeadline < :cutoff")
    void deleteOldEvents(@Param("cutoff") LocalDateTime cutoff);
}
