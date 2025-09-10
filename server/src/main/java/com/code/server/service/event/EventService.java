package com.code.server.service.event;

import com.code.server.dto.event.EventDto;
import com.code.server.dto.event.PageCount;
import com.code.server.service.CrudDtoService;

import java.util.List;
import java.util.UUID;

public interface EventService extends CrudDtoService<UUID, EventDto> {
    List<EventDto> getPage(Integer page, Integer limit);
    List<EventDto> findAll();
    void deleteOldEvents();
    PageCount getPageCount(Integer limit);
}
