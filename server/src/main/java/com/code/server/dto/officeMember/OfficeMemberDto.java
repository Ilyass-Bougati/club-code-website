package com.code.server.dto.officeMember;

import com.code.server.dto.image.ImageDto;
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

    @NotNull(message = "Office member's image can't be null")
    private ImageDto image;

    @NotEmpty(message = "Office member's firstname can't be empty or null")
    private String firstName;

    @NotEmpty(message = "Office member's lastname can't be empty or null")
    private String lastName;

    @NotEmpty(message = "Office member's position can't be empty or null")
    private String position;

    @NotEmpty(message = "Office member's linkedin can't be empty or null")
    private String linkedin;

    @NotEmpty(message = "Office member's instagram can't be empty or null")
    private String instagram;

    @CreationTimestamp
    private LocalDateTime addedAt;
}
