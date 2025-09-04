package com.code.server.service.Image;


import com.code.server.entity.Image;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.ImageRepository;
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
public class ImageEntityServiceImpl implements ImageEntityService {

    private final ImageRepository imageRepository;

    @Override
    public Image findById(@NotNull UUID id) {
        return imageRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Image not found"));
    }
}
