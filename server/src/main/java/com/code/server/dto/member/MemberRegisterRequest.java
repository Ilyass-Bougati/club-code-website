package com.code.server.dto.member;

import com.code.server.dto.areaOfInterest.AreaOfInterestDto;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberRegisterRequest {
    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    @Size(min = 10, max = 10, message = "Phone number must be 10 characters long")
    private String phoneNumber;

    @NotNull
    @Min(value = 1, message = "Number of years for a registration request can't be less than 1")
    @Max(value = 10, message = "Number of years for a registration request can't be more than 10")
    private Integer year;

    @NotNull
    @Builder.Default
    private List<UUID> areaOfInterests = new ArrayList<>();

    @NotEmpty
    private String major;
}
