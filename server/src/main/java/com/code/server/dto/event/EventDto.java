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

    @NotBlank(message = "Event's title can't be empty or null")
    private String title;

    @NotBlank(message = "Event's description can't be empty or null")
    private String description;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Event's type can't be empty or null")
    private EventType eventType;

    @NotNull(message = "Event's image can't be null")
    private ImageDto image;

    @NotNull
    @Builder.Default
    private List<AreaOfInterestDto> areaOfInterests = new ArrayList<>();

    @Builder.Default
    private List<SponsorDto> sponsors = new ArrayList<>();

    @NotNull
    @Builder.Default
    private Boolean sponsored = false;

    @NotNull
    @Builder.Default
    private Boolean registrationOpen = true;

    @NotNull(message = "Event's registration deadline can't be null")
    private LocalDateTime registrationDeadline;

    @CreationTimestamp
    private LocalDateTime publishedAt;
}
