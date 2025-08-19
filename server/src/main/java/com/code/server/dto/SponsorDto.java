package com.code.server.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SponsorDto {
    private UUID id;

    @NotBlank
    private String name;
}
