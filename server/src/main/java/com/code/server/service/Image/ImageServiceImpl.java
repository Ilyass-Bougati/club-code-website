package com.code.server.service.Image;

import com.code.server.dto.image.ImageDto;
import com.code.server.dto.image.ImageMapper;
import com.code.server.entity.Image;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final ImageMapper imageMapper;
    private final UploadImageService uploadImageService;

    @Override
    public ImageDto save(ImageDto imageDto) {
        // making sure the imageDto doesn't have an id
        imageDto.setId(null);
        return imageMapper.toDTO(
                imageRepository.save(imageMapper.toEntity(imageDto))
        );
    }

    /**
     * This shouldn't be used, the uri of the image isn't provided by us for it to be
     * modified
     * @param imageDto the new image dto
     * @return the updated image
     */
    @Deprecated(forRemoval = false)
    @Override
    public ImageDto update(ImageDto imageDto) {
        Image image = imageRepository.findById(imageDto.getId())
                .orElseThrow(() -> new NotFoundException("Image doesn't exist"));

        image.setUri(imageDto.getUri());
        image.setHost(imageDto.getHost());
        return imageMapper.toDTO(imageRepository.save(image));
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

    @Override
    public ImageDto uploadImage(MultipartFile file) {
        String[] splitName = file.getOriginalFilename().split("\\.");
        String suffix = splitName[splitName.length - 1];
        if (suffix.equals("jpg") || suffix.equals("png")) {
            return save(uploadImageService.uploadImage(file));
        } else {
            throw new RuntimeException("Unsupported image format");
        }
    }
}
