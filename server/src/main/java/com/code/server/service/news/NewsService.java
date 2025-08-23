package com.code.server.service.news;

import com.code.server.dto.news.NewsDto;
import com.code.server.service.CrudDtoService;

import java.util.List;
import java.util.UUID;

public interface NewsService extends CrudDtoService<UUID, NewsDto> {
    List<NewsDto> getAllNews();
}
