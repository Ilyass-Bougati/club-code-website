package com.code.server.service.areasOfInterest;

import com.code.server.entity.AreaOfInterest;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.AreasOfInterestRepository;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.UUID;

// TODO : This might be cached
@Service
@Validated
@Transactional
@RequiredArgsConstructor
public class AreasOfInterestEntityServiceImpl implements AreasOfInterestEntityService {

    private final AreasOfInterestRepository areasOfInterestRepository;

    @Override
    @Transactional(readOnly = true)
    public AreaOfInterest findById(@NotNull(message = "Area of interest Id can't be null") UUID uuid) {
        return areasOfInterestRepository.findById(uuid)
                .orElseThrow(() -> new NotFoundException("Area of interest not found"));
    }
}
