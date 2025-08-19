package com.code.server.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AreaOfInterestDto {
    private UUID id;

    @NotBlank
    private String name;
}
