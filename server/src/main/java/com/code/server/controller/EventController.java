package com.code.server.controller;


import com.code.server.dto.event.EventDto;
import com.code.server.service.event.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    @ResponseStatus(HttpStatus.OK)
    public void deleteEvent(@PathVariable UUID id){
        eventService.delete(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<EventDto> updateEvent(@RequestBody  EventDto eventDto){
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
