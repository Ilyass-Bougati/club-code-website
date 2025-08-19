package com.code.server.dto.news;

import com.code.server.dto.image.ImageMapper;
import com.code.server.entity.News;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NewMapperImpl implements NewsMapper {

    private final ImageMapper imageMapper;

    @Override
    public NewsDto toDTO(News news) {
        return NewsDto.builder()
                .id(news.getId())
                .title(news.getTitle())
                .description(news.getDescription())
                .image(imageMapper.toDTO(news.getImage()))
                .type(news.getType())
                .publishedAt(news.getPublishedAt())
                .build();
    }

    @Override
    public News toEntity(NewsDto newsDto) {
        return News.builder()
                .id(newsDto.getId())
                .title(newsDto.getTitle())
                .description(newsDto.getDescription())
                .type(newsDto.getType())
                .image(imageMapper.toEntity(newsDto.getImage()))
                .publishedAt(newsDto.getPublishedAt())
                .build();
    }
}
