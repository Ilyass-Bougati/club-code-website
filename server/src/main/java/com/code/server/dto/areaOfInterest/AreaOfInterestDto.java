package com.code.server.dto.areaOfInterest;

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

    @NotBlank(message = "Area of interest name can't be empty or null")
    private String name;
}
