package com.code.server.entity;

import com.code.server.enums.EventType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "events")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @EqualsAndHashCode.Include
    private UUID id;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @Enumerated(EnumType.STRING)
    @NotNull
    private EventType eventType;

    @NotNull
    private Boolean sponsored;

    @NotNull
    private Boolean registrationOpen;

    @NotNull
    private LocalDateTime registrationDeadline;

    @CreationTimestamp
    private LocalDateTime publishedAt;

    @NotNull
    @Builder.Default
    private Boolean published = true;
}
