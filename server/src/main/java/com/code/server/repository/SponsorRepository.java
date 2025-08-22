package com.code.server.repository;

import com.code.server.entity.Sponsor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ServiceRepository extends JpaRepository<Sponsor,UUID> {
}
