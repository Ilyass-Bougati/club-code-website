package com.code.server.controller;


import com.code.server.dto.event.EventDto;
import com.code.server.service.event.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/event")
@RequiredArgsConstructor

public class EventController {

    private final EventService eventService;
    @PostMapping
    public ResponseEntity<EventDto> addEvent(@RequestBody EventDto eventDto){
        return ResponseEntity.ok(eventService.save(eventDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable UUID id){
       eventService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<EventDto> updateEvent(@PathVariable UUID id,@RequestBody  EventDto eventDto){
        eventDto.setId(id);
        return ResponseEntity.ok(eventService.update(eventDto));
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents(){
        return ResponseEntity.ok(eventService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getEvent(@PathVariable UUID id){
        return ResponseEntity.ok(eventService.findById(id));
    }
}
