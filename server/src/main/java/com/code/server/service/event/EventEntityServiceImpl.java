package com.code.server.service.event;

import com.code.server.entity.Event;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class EventEntityServiceImpl implements EventEntityService {

    private final EventRepository eventRepository;

    @Override
    @Transactional(readOnly = true)
    public Event findById(UUID id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Event not found"));
    }
}
