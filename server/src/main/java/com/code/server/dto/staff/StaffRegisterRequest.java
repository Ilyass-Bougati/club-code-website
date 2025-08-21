package com.code.server.dto.staff;

import com.code.server.enums.StaffRole;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StaffRegisterRequest {
    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @NotNull
    private StaffRole role = StaffRole.ADMIN;
}
