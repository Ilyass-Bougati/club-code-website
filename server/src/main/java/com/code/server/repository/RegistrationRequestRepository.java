package com.code.server.repository;

import com.code.server.entity.RegistrationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RegistrationRequestRepository extends JpaRepository<RegistrationRequest, UUID> {
}
