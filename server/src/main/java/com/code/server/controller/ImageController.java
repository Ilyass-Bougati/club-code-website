package com.code.server.controller;

import com.code.server.dto.image.ImageDto;
import com.code.server.service.Image.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/image")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @GetMapping("/{id}")
    public ResponseEntity<ImageDto> getImage(@PathVariable UUID id) {
        return ResponseEntity.ok(imageService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ImageDto> createImage(@RequestBody ImageDto imageDto) {
        return ResponseEntity.ok(imageService.save(imageDto));
    }

    // TODO : change this later
    @PostMapping("/upload")
    public ResponseEntity<ImageDto> uploadImage(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(imageService.uploadImage(file));
    }

    @PutMapping
    public ResponseEntity<ImageDto> updateImage(@RequestBody ImageDto imageDto) {
        return ResponseEntity.ok(imageService.update(imageDto));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteImage(@PathVariable UUID id) {
        imageService.delete(id);
    }
}
