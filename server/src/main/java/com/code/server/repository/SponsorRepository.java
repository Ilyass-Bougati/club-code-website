package com.code.server.repository;

import com.code.server.entity.Sponsor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface SponsorRepository extends JpaRepository<Sponsor,UUID> {
}
