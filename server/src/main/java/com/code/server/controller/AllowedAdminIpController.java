package com.code.server.controller;

import com.code.server.dto.allowedAdminIp.AddAllowedAdminIpRequest;
import com.code.server.entity.AllowedAdminIp;
import com.code.server.repository.AllowedAdminIpRepository;
import com.code.server.service.allowedAdminIp.AllowedAdminIpEntityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth/allowedips")
public class AllowedAdminIpController {

    private final AllowedAdminIpEntityService allowedAdminIpEntityService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public void addAllowedAdminIp(@RequestBody @Valid AddAllowedAdminIpRequest request){
        allowedAdminIpEntityService.add(request);
    }

    @DeleteMapping("/{ipAddress}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public void deleteAllowedAdminIp(@PathVariable String ipAddress){
        allowedAdminIpEntityService.delete(ipAddress);
    }

}
