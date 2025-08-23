package com.code.server.repository;

import com.code.server.entity.AreaOfInterest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AreasOfInterestRepository extends JpaRepository<AreaOfInterest, UUID> {
}
