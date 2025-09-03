package com.code.server.dto.image;

import com.code.server.enums.ImageHost;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageDto {
    private UUID id;

    @NotBlank(message = "Image uri can't be empty or null")
    private String uri;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Image host can't be null")
    private ImageHost host;
}
