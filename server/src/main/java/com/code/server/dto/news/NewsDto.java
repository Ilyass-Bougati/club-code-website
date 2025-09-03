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

    @NotBlank(message = "News's title can't be empty or null")
    private String title;

    @NotBlank(message = "News's description can't be empty or null")
    private String description;

    @NotNull(message = "News's image can't be null")
    private ImageDto image;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "News's type can't be null")
    private NewsType type;

    @CreationTimestamp
    private LocalDateTime publishedAt;
}
