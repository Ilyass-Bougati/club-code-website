package com.code.server.dto;

import com.code.server.entity.Event;
import com.code.server.entity.News;
import com.code.server.enums.StaffRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
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
