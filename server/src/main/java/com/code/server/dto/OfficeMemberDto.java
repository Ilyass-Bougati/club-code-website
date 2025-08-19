package com.code.server.dto;

import jakarta.validation.constraints.NotEmpty;
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
public class OfficeMemberDto {
    private UUID id;

    @NotNull
    private ImageDto image;

    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

    @NotEmpty
    private String position;

    @NotEmpty
    private String linkedin;

    @NotEmpty
    private String instagram;

    @CreationTimestamp
    private LocalDateTime addedAt;
}
