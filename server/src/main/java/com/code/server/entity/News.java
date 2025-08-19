package com.code.server.entity;


import com.code.server.enums.NewsType;
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
@Entity(name = "news")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @EqualsAndHashCode.Include
    private UUID id;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    // might remove this later if it proves unneeded
    // otherwise I'll need to add a default value
    @Enumerated(EnumType.STRING)
    @NotNull
    private NewsType type;

    @CreationTimestamp
    private LocalDateTime publishedAt;

    @Builder.Default
    private Boolean published = true;
}
