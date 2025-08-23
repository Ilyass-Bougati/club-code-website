package com.code.server.service.event;

import com.code.server.dto.areaOfInterest.AreaOfInterestMapper;
import com.code.server.dto.event.EventDto;
import com.code.server.dto.event.EventMapperImpl;
import com.code.server.dto.image.ImageMapper;
import com.code.server.dto.sponsor.SponsorMapper;
import com.code.server.entity.Event;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class EventServiceImp implements EventService{

    private final EventRepository eventRepository;
    private final EventMapperImpl eventMapper;
    private final SponsorMapper sponsorMapper;
    private final AreaOfInterestMapper areaOfInterestMapper;
    private final ImageMapper imageMapper;

    @Override
    public EventDto save(EventDto eventDto) {
        eventDto.setId(null);
        return eventMapper.toDTO(
                eventRepository.save(eventMapper.toEntity(eventDto))
        );
    }

    @Override
    public EventDto update(EventDto eventDto) {
        Event event=eventRepository.findById(eventDto.getId())
                .orElseThrow(()->new NotFoundException("Member not found"));
        event.setTitle(eventDto.getTitle());
        event.setEventType(eventDto.getEventType());
        event.setDescription(eventDto.getDescription());
        event.setRegistrationOpen(eventDto.getRegistrationOpen());

        event.setSponsors(eventDto.getSponsors()
                .stream()
                .map(sponsorMapper::toEntity)
                .collect(Collectors.toSet()) );
        event.setAreaOfInterests(eventDto.getAreaOfInterests()
                .stream()
                .map(areaOfInterestMapper::toEntity)
                .collect(Collectors.toSet()));
        event.setSponsored(eventDto.getSponsored());
        //TODO
        event.setImage(imageMapper.toEntity(eventDto.getImage()));

        return null;

    }

    @Override
    public void delete(UUID uuid) {
        eventRepository.findById(uuid)
                .orElseThrow(() -> new NotFoundException("event not found  "));
        eventRepository.deleteById(uuid);
    }

    @Override
    @Transactional(readOnly = true)
    public EventDto findById(UUID uuid) {
        return eventRepository.findById(uuid)
                .map(eventMapper::toDTO)
                .orElseThrow(() -> new NotFoundException("event not found"));
    }

    // TODO : add pagination
    @Override
    @Transactional(readOnly = true)
    public List<EventDto> findAll() {
        return eventRepository.findAll()
                .stream()
                .map(eventMapper::toDTO)
                .collect(Collectors.toList());
    }
}
