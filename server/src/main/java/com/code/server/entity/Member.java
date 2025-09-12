package com.code.server.entity;

import com.code.server.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @EqualsAndHashCode.Include
    private UUID id;

    @Email
    @NotBlank
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String password;

    @NotBlank
    @Column(unique = true)
    @Size(min = 10, max = 10)
    private String phoneNumber;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @NotNull
    private UserRole role = UserRole.USER;

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy="member")
    private Set<Event> addedEvents = new HashSet<>();

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy="member")
    private Set<News> addedNews = new HashSet<>();

    @NotNull
    @Min(value = 1, message = "Number of years for a registration request can't be less than 1")
    @Max(value = 10, message = "Number of years for a registration request can't be more than 10")
    private Integer year;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "event_area_of_interests",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "area_of_interests_id")
    )
    @Builder.Default
    private Set<AreaOfInterest> areaOfInterests = new HashSet<>();

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "members_interest_event",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    @Builder.Default
    private Set<Event> interestEvents = new HashSet<>();

    @NotEmpty
    private String major;

    @Column(length = 1024)
    private String refreshToken;

    @Builder.Default
    private Boolean activated = false;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
