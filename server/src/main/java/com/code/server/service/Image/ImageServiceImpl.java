package com.code.server.service.Image;

import com.code.server.dto.image.ImageDto;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ImageServiceImpl implements ImageService {
    @Override
    public ImageDto save(ImageDto imageDto) {
        return null;
    }

    @Override
    public ImageDto update(ImageDto imageDto) {
        return null;
    }

    @Override
    public void delete(UUID uuid) {

    }

    @Override
    public ImageDto findById(UUID uuid) {
        return null;
    }
}
