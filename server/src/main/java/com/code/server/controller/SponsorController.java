package com.code.server.controller;


import com.code.server.dto.sponsor.SponsorDto;
import com.code.server.service.sponsor.SponsorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/sponsor")
@RequiredArgsConstructor
public class SponsorController {
    private final SponsorService sponsorService;

    @PostMapping
    public ResponseEntity<SponsorDto> createSponsor(@RequestBody @Valid SponsorDto dto) {
        SponsorDto created = sponsorService.save(dto);
        return ResponseEntity
                .created(URI.create("/api/v1/sponsor/" + created.getId()))
                .body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SponsorDto> getSponsor(@PathVariable UUID id) {
        return ResponseEntity.ok(sponsorService.findById(id));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteSponsor(@PathVariable UUID id) {
        sponsorService.delete(id);
    }

    @PutMapping
    public ResponseEntity<SponsorDto> updateImage(@RequestBody @Valid SponsorDto sponsorDto) {
        return ResponseEntity.ok(sponsorService.update(sponsorDto));
    }
}
