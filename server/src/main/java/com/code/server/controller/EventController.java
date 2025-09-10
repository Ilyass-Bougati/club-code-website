package com.code.server.controller;


import com.code.server.dto.event.EventDto;
import com.code.server.dto.event.PageCount;
import com.code.server.service.event.EventService;
import com.code.server.service.member.MemberService;
import com.code.server.service.member.security.CustomUserDetails;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/event")
@RequiredArgsConstructor

public class EventController {

    private final EventService eventService;
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<EventDto> addEvent(@RequestBody @Valid EventDto eventDto){
        return ResponseEntity.ok(eventService.save(eventDto));
    }

    @PostMapping("/register/{id}")
    public void addEvent(@AuthenticationPrincipal CustomUserDetails principal, @PathVariable UUID id){
        memberService.registerMember(principal.getMember(), id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteEvent(@PathVariable UUID id){
        eventService.delete(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<EventDto> updateEvent(@RequestBody @Valid EventDto eventDto){
        return ResponseEntity.ok(eventService.update(eventDto));
    }

    // This is the page size used in getAllEvents
    private final static Integer pageSize = 20;

    // TODO : test this later, it looks sketchy
    @GetMapping("/page/{page}")
    public ResponseEntity<List<EventDto>> getAllEvents(@PathVariable @Min(value = 1, message = "Page can't be less than 1") Integer page){
        return ResponseEntity.ok(eventService.getPage(page - 1, pageSize));
    }

    @GetMapping("/page/count")
    public ResponseEntity<PageCount> getEventPageCount() {
        return ResponseEntity.ok(eventService.getPageCount(pageSize));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getEvent(@PathVariable UUID id){
        return ResponseEntity.ok(eventService.findById(id));
    }
}
