package com.code.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

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
public class AreaOfInterest {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @EqualsAndHashCode.Include
    private UUID id;

    @NotBlank
    private String name;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "areaOfInterests")
    @Builder.Default
    private Set<Event> events = new HashSet<>();;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Member> members = new HashSet<>();
}
