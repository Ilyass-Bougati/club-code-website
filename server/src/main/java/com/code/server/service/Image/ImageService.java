package com.code.server.service.Image;

import com.code.server.dto.image.ImageDto;
import com.code.server.service.CrudDtoService;

import java.util.UUID;

public interface ImageService extends CrudDtoService<UUID, ImageDto> {
}
