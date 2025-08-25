package com.code.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "registration_requests")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RegistrationRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @EqualsAndHashCode.Include
    private UUID id;

    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

    @NotEmpty
    @Email
    private String email;

    @NotNull
    @Min(value = 1, message = "Number of years for a registration request can't be less than 1")
    @Max(value = 10, message = "Number of years for a registration request can't be more than 10")
    private Integer year;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @Builder.Default
    private Set<AreaOfInterest> areaOfInterests = new HashSet<>();

    @NotEmpty
    private String major;
}
