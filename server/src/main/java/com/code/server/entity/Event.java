package com.code.server.entity;

import com.code.server.enums.EventType;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    // using lazy fetching, because the Image will be loaded
    // separately through the service, which will cache it
    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    private Image image;

    // This could become eagerly fetched later on
    @Builder.Default
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "events_area_of_interests",
            joinColumns = @JoinColumn(name = "events_id"),
            inverseJoinColumns = @JoinColumn(name = "area_of_interests_id")
    )
    private Set<AreaOfInterest> areaOfInterests = new HashSet<>();

    // This could become eagerly fetched later on
    @Builder.Default
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "events_sponsors",
            joinColumns = @JoinColumn(name = "events_id"),
            inverseJoinColumns = @JoinColumn(name = "sponsors_id")
    )
    private Set<Sponsor> sponsors = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;

    @NotNull
    private Boolean sponsored;

    @NotNull
    private Boolean registrationOpen;


    private LocalDateTime registrationDeadline;

    @CreationTimestamp
    private LocalDateTime publishedAt;

    @NotNull
    @Builder.Default
    private Boolean published = true;
}
