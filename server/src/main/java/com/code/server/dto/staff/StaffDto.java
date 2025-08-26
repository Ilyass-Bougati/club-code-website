package com.code.server.dto.staff;

import com.code.server.enums.StaffRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StaffDto {
    private UUID id;

    @Email
    @NotBlank
    private String email;

    @Enumerated(EnumType.STRING)
    @NotNull
    private StaffRole role;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
