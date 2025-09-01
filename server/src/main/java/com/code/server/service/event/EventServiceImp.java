package com.code.server.service.event;

import com.code.server.dto.areaOfInterest.AreaOfInterestMapper;
import com.code.server.dto.event.EventDto;
import com.code.server.dto.event.EventMapperImpl;
import com.code.server.dto.image.ImageMapper;
import com.code.server.dto.sponsor.SponsorMapper;
import com.code.server.entity.*;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.AreasOfInterestRepository;
import com.code.server.repository.EventRepository;
import com.code.server.repository.ImageRepository;
import com.code.server.repository.SponsorRepository;
import com.code.server.service.Image.ImageEntityService;
import com.code.server.service.areasOfInterest.AreasOfInterestEntityService;
import com.code.server.service.member.MemberEntityService;
import com.code.server.service.sponsor.SponsorEntityService;
import com.code.server.service.sponsor.SponsorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Validated
@Transactional
@RequiredArgsConstructor
public class EventServiceImp implements EventService {

    private final EventRepository eventRepository;
    private final EventMapperImpl eventMapper;
    private final SponsorEntityService sponsorEntityService;
    private final AreasOfInterestEntityService areasOfInterestEntityService;
    private final ImageEntityService imageEntityService;

    @Override
    public EventDto save(EventDto eventDto) {
        eventDto.setId(null);
        return eventMapper.toDTO(
                eventRepository.save(eventMapper.toEntity(eventDto))
        );
    }

    @Override
    public EventDto update(@Valid EventDto eventDto) {
        Event event = eventRepository.findById(eventDto.getId())
                .orElseThrow(()->new NotFoundException("Event not found"));

        event.setTitle(eventDto.getTitle());
        event.setEventType(eventDto.getEventType());
        event.setDescription(eventDto.getDescription());
        event.setSponsored(eventDto.getSponsored());
        event.setRegistrationDeadline(eventDto.getRegistrationDeadline());
        event.setRegistrationOpen(eventDto.getRegistrationOpen());

        Set<Sponsor> sponsors = eventDto.getSponsors().stream()
                .map(dto -> sponsorEntityService.findById(dto.getId()))
                .collect(Collectors.toSet());
        event.setSponsors(sponsors);

        Set<AreaOfInterest> areas = eventDto.getAreaOfInterests().stream()
                .map(dto -> areasOfInterestEntityService.findById(dto.getId()))
                .collect(Collectors.toSet());
        event.setAreaOfInterests(areas);

        event.setImage(imageEntityService.findById(eventDto.getImage().getId()));

        return eventMapper.toDTO(eventRepository.save(event));
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


    @Override
    public List<EventDto> getPage(Integer page, Integer limit) {
        return eventRepository.getPage(limit, page * limit)
                .stream().map(eventMapper::toDTO).toList();
    }
}
