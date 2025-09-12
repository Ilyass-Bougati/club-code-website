package com.code.server.service.news;

import com.code.server.dto.news.NewsDto;
import com.code.server.dto.news.NewsMapper;
import com.code.server.entity.News;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.NewsRepository;
import com.code.server.service.Image.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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
    @Cacheable(value = "newsCache", key = "#id")
    public NewsDto findById(UUID id) {
        return newsRepository.findById(id)
                .map(newsMapper::toDTO)
                .orElseThrow(() -> new NotFoundException("News not found"));
    }

    @Override
    @Caching(evict = {
            @CacheEvict(value = "allNewsCache", key = "'ALL_NEWS'")
    }, put = {
            @CachePut(value = "newsCache", key = "#result.id")
    })
    public NewsDto save(NewsDto dto) {
        dto.setId(null);
        News news = newsMapper.toEntity(dto);
        News saved = newsRepository.save(news);
        return newsMapper.toDTO(saved);
    }

    @Override
    @Caching(evict = {
            @CacheEvict(value = "newsCache", key = "#id"),
            @CacheEvict(value = "allNewsCache", key = "'ALL_NEWS'")
    })
    public void delete(UUID id) {
         News news = newsRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("News not found with UUID: " + id));
         imageService.delete(news.getImage().getId());
         newsRepository.deleteById(id);
    }


    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "allNewsCache", key = "'ALL_NEWS'")
    public List<NewsDto> getAllNews() {
        return newsRepository.findAll()
                .stream()
                .map(newsMapper::toDTO)
                .collect(Collectors.toList());
    }


    @Override
    @Caching(evict = {
            @CacheEvict(value = "allNewsCache", key = "'ALL_NEWS'")
    }, put = {
            @CachePut(value = "newsCache", key = "#dto.id")
    })
    public NewsDto update(NewsDto dto) {
        News existing = newsRepository.findById(dto.getId())
                .orElseThrow(() -> new NotFoundException("News not found"));
        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setPublishedAt(dto.getPublishedAt());

        News updated = newsRepository.save(existing);
        return newsMapper.toDTO(updated);
    }

    @Override
    @CacheEvict(value = "allNewsCache", key = "'ALL_NEWS'")
    public void deleteOldNews() {
        LocalDateTime cutoff = LocalDateTime.now().minusMonths(1);
        newsRepository.deleteOldNews(cutoff);
    }
}
