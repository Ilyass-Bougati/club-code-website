package com.code.server.dto.event;

import com.code.server.dto.areaOfInterest.AreaOfInterestDto;
import com.code.server.dto.image.ImageDto;
import com.code.server.dto.sponsor.SponsorDto;
import com.code.server.enums.EventType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.*;


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
    private List<AreaOfInterestDto> areaOfInterests = new ArrayList<>();

    @NotNull
    @Builder.Default
    private List<SponsorDto> sponsors = new ArrayList<>();

    @NotNull
    private Boolean sponsored;

    @NotNull
    private Boolean registrationOpen;

    @NotNull
    private LocalDateTime registrationDeadline;

    @CreationTimestamp
    private LocalDateTime publishedAt;
}
