package com.code.server.controller;

import com.code.server.dto.news.NewsDto;
import com.code.server.service.news.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/news")
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;



    @PostMapping
    public ResponseEntity<NewsDto> createNews(@RequestBody NewsDto dto) {
        NewsDto created = newsService.save(dto);
        return ResponseEntity
                .created(URI.create("/api/v1/news/" + created.getId()))
                .body(created);
    }


    @GetMapping
    public ResponseEntity<List<NewsDto>> getAllNews() {
        return ResponseEntity.ok(newsService.getAllNews());
    }


    @GetMapping("/{id}")
    public ResponseEntity<NewsDto> getNewsById(@PathVariable UUID id) {
        NewsDto news = newsService.findById(id);
        return news != null
                ? ResponseEntity.ok(news)
                : ResponseEntity.notFound().build();
    }


    @PutMapping("/{id}")
    public ResponseEntity<NewsDto> updateNews( @RequestBody NewsDto dto) {
        NewsDto updated = newsService.update(dto);
        return updated != null
                ? ResponseEntity.ok(updated)
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable UUID id) {
        newsService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
