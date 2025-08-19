package com.code.server.entity;

import com.code.server.enums.StaffRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jdk.jfr.Timestamp;
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
@Entity(name = "staffs")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @EqualsAndHashCode.Include
    private UUID id;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @NotNull
    private StaffRole role = StaffRole.ADMIN;

    @Builder.Default
    @OneToMany(mappedBy="staff")
    private Set<Event> addedEvents = new HashSet<>();

    @Builder.Default
    @OneToMany(mappedBy="staff")
    private Set<News> addedNews = new HashSet<>();

    @CreationTimestamp
    private LocalDateTime createdAt;
}
