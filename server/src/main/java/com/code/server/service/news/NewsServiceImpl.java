package com.code.server.service.news;

import com.code.server.dto.news.NewsDto;
import com.code.server.dto.news.NewsMapper;
import com.code.server.entity.News;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.NewsRepository;
import com.code.server.service.Image.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@Transactional
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService{

    private final NewsRepository newsRepository;

    private final NewsMapper newsMapper;

    private final ImageService imageService;


    @Override
    @Transactional(readOnly = true)
    public NewsDto findById(UUID id) {
        return newsRepository.findById(id)
                .map(newsMapper::toDTO)
                .orElseThrow(() -> new NotFoundException("News not found"));
    }

    @Override
    public NewsDto save(NewsDto dto) {
        dto.setId(null);
        News news = newsMapper.toEntity(dto);
        News saved = newsRepository.save(news);
        return newsMapper.toDTO(saved);
    }

    @Override
    public void delete(UUID id) {
         News news = newsRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("News not found with UUID: " + id));
         imageService.delete(news.getImage().getId());
         newsRepository.deleteById(id);
    }


    @Override
    @Transactional(readOnly = true)
    public List<NewsDto> getAllNews() {
        return newsRepository.findAll()
                .stream()
                .map(newsMapper::toDTO)
                .collect(Collectors.toList());
    }


    @Override
    public NewsDto update(NewsDto dto) {
        News existing = newsRepository.findById(dto.getId())
                .orElseThrow(() -> new NotFoundException("News not found"));
        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setPublishedAt(dto.getPublishedAt());

        News updated = newsRepository.save(existing);
        return newsMapper.toDTO(updated);
    }
}
