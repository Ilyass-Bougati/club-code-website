package com.code.server.repository;

import com.code.server.entity.AllowedAdminIp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AllowedAdminIpRepository extends JpaRepository<AllowedAdminIp, UUID> {
    Boolean existsByIp(String ip);
    void deleteAllowedAdminIpByIp(String ipAddress);
}
