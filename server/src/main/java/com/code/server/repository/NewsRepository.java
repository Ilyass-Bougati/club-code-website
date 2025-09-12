package com.code.server.repository;

import com.code.server.entity.News;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Repository
public interface NewsRepository extends JpaRepository<News, UUID> {

    @Transactional
    @Modifying
    @Query("DELETE FROM News n WHERE n.publishedAt < :cutoff")
    void deleteOldNews(@Param("cutoff") LocalDateTime cutoff);
}