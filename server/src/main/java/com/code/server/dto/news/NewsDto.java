package com.code.server.dto.news;

import com.code.server.dto.image.ImageDto;
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
@NoArgsConstructor
@AllArgsConstructor
public class NewsDto {
    private UUID id;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private ImageDto image;

    @Enumerated(EnumType.STRING)
    @NotNull
    private NewsType type;

    @CreationTimestamp
    private LocalDateTime publishedAt;
}
