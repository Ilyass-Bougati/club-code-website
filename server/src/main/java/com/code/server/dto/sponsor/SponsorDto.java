package com.code.server.dto.sponsor;

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

    @NotBlank(message = "Sponsor's name can't be empty or null")
    private String name;
}
