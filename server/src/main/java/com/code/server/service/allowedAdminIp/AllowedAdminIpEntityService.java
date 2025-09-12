package com.code.server.service.allowedAdminIp;

import com.code.server.dto.allowedAdminIp.AddAllowedAdminIpRequest;
import com.code.server.entity.AllowedAdminIp;
import com.code.server.repository.AllowedAdminIpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AllowedAdminIpEntityService {

    private final AllowedAdminIpRepository allowedAdminIpRepository;

    @Transactional(readOnly = true)
    @Cacheable(value = "ipAdminCache", key = "#ipAddress")
    public Boolean ipExists(String ipAddress) {
        return allowedAdminIpRepository.existsByIp(ipAddress);
    }

    @CachePut(value = "ipAdminCache", key = "#request.ip")
    public Boolean add(AddAllowedAdminIpRequest request) {
        AllowedAdminIp newIp = AllowedAdminIp.builder()
                .ip(request.getIp())
                .identifier(request.getIdentifier())
                .build();

        allowedAdminIpRepository.save(newIp);
        return true;
    }

    @CacheEvict(value = "ipAdminCache", key = "#ipAddress")
    public void delete(String ipAddress) {
        allowedAdminIpRepository.deleteAllowedAdminIpByIp(ipAddress);
    }
}
