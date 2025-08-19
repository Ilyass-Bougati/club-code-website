package com.code.server.dto;

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

    @NotBlank
    private String uri;

    @Enumerated(EnumType.STRING)
    @NotNull
    private ImageHost host;
}
