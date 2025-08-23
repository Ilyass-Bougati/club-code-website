package com.code.server.service.Image;

import com.code.server.dto.image.ImageDto;
import com.code.server.exception.StorageException;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface UploadImageService {
    ImageDto uploadImage(MultipartFile file) throws StorageException;
    void deleteImage(UUID id);
}
