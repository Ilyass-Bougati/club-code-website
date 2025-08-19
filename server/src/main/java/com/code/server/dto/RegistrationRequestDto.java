package com.code.server.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequestDto {
    private UUID id;

    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

    @NotEmpty
    @Email
    private String email;

    @NotNull
    @Min(value = 1, message = "Number of years for a registration request can't be less than 1")
    @Max(value = 10, message = "Number of years for a registration request can't be more than 10")
    private Integer year;

    @NotNull
    @Builder.Default
    private Set<AreaOfInterestDto> areaOfInterests = new HashSet<>();

    @NotEmpty
    private String major;
}
