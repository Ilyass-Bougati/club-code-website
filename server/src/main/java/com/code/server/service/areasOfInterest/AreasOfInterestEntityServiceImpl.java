package com.code.server.service.areasOfInterest;

import com.code.server.entity.AreaOfInterest;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.AreasOfInterestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

// TODO : This might be cached
@Service
@RequiredArgsConstructor
public class AreasOfInterestEntityServiceImpl implements AreasOfInterestEntityService {

    private final AreasOfInterestRepository areasOfInterestRepository;

    @Override
    @Transactional(readOnly = true)
    public AreaOfInterest findById(UUID uuid) {
        return areasOfInterestRepository.findById(uuid)
                .orElseThrow(() -> new NotFoundException("Area of interest not found"));
    }
}
