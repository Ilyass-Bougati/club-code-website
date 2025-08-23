package com.code.server.service.Image;

import com.code.server.dto.image.ImageDto;
import com.code.server.enums.ImageHost;
import com.code.server.exception.StorageException;
import com.code.server.properties.StorageProperties;
import com.code.server.service.cloudinary.CloudinaryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Slf4j
@Service
public class UploadImageServiceImpl implements UploadImageService {

    private final Path rootLocation;
    private final CloudinaryService cloudinaryService;

    public UploadImageServiceImpl(StorageProperties properties, CloudinaryService cloudinaryService) throws StorageException {
        this.cloudinaryService = cloudinaryService;

        if(properties.location().trim().isEmpty()){
            throw new StorageException("File upload location can not be Empty.");
        }
        this.rootLocation = Paths.get(properties.location());
    }

    @Override
    public ImageDto uploadImage(MultipartFile file) throws StorageException {
        try {
            // Writing the file temporarily to the drive
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }
            Path destinationFile = this.rootLocation.resolve(
                            Paths.get(Objects.requireNonNull(file.getOriginalFilename())))
                    .normalize().toAbsolutePath();
            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                // This is a security check
                throw new StorageException("Cannot store file outside current directory.");
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile,
                        StandardCopyOption.REPLACE_EXISTING);
            }

            // uploading the image to cloudinary
            Map<String, Object> res = cloudinaryService.upload(destinationFile.toFile());

            // adding the image to the database
            ImageDto image = ImageDto.builder()
                    .host(ImageHost.CLOUDINARY)
                    .uri(res.get("url").toString())
                    .build();


            // deleting the file from the drive
            if (!destinationFile.toFile().delete()) {
                log.error("Failed to delete temporary file.");
            }
            return image;
        } catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }

    @Override
    public void deleteImage(String uri) {
        cloudinaryService.delete(uri);
    }
}
