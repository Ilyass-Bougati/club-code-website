package com.code.server.service.Image;

import com.code.server.entity.Image;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageEntityServiceImpl implements ImageEntityService {

    private final ImageRepository imageRepository;

    @Override
    public Image findById(UUID id) {
        return imageRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Image not found"));
    }
}
