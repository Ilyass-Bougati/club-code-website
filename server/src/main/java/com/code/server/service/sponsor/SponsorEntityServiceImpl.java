package com.code.server.service.sponsor;

import com.code.server.entity.Sponsor;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.SponsorRepository;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.UUID;

@Service
@Validated
@Transactional
@RequiredArgsConstructor
public class SponsorEntityServiceImpl implements SponsorEntityService {

    private final SponsorRepository sponsorRepository;

    @Override
    @Transactional(readOnly = true)
    public Sponsor findById(@NotNull(message = "Sponsor Id can't be null") UUID uuid) {
        return sponsorRepository.findById(uuid)
                .orElseThrow(() -> new NotFoundException("Sponsor not found"));
    }
}
