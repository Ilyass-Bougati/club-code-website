package com.code.server.service.Image;

import com.code.server.dto.image.ImageDto;
import com.code.server.dto.image.ImageMapper;
import com.code.server.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;

    @Override
    public ImageDto save(ImageDto imageDto) {
        return null;
    }

    @Override
    public ImageDto update(ImageDto imageDto) {
        return null;
    }

    @Override
    public void delete(UUID id) {
        imageRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ImageDto findById(UUID id) {
        return imageRepository.findById(id)
                .map(imageMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Image not found"));
    }
}
