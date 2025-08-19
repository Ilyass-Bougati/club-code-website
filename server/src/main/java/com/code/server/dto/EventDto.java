package com.code.server.dto;

import com.code.server.enums.EventType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventDto {
    private UUID id;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @Enumerated(EnumType.STRING)
    @NotNull
    private EventType eventType;

    @NotNull
    private ImageDto image;

    @NotNull
    @Builder.Default
    private Set<AreaOfInterestDto> areaOfInterests = new HashSet<>();

    @NotNull
    @Builder.Default
    private Set<SponsorDto> sponsors = new HashSet<>();

    @NotNull
    private Boolean sponsored;

    @NotNull
    private Boolean registrationOpen;

    @NotNull
    private LocalDateTime registrationDeadline;

    @CreationTimestamp
    private LocalDateTime publishedAt;
}
