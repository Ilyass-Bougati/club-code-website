package com.code.server.dto.image;

import com.code.server.entity.Image;
import org.springframework.stereotype.Service;

@Service
public class ImageMapperImpl implements ImageMapper {
    @Override
    public ImageDto toDTO(Image image) {
        return ImageDto.builder()
                .id(image.getId())
                .uri(image.getUri())
                .host(image.getHost())
                .build();
    }

    @Override
    public Image toEntity(ImageDto imageDto) {
        return Image.builder()
                .id(imageDto.getId())
                .uri(imageDto.getUri())
                .host(imageDto.getHost())
                .build();
    }
}
