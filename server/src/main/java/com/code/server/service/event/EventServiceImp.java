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
import com.code.server.service.member.MemberEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class EventServiceImp implements EventService{

    private final EventRepository eventRepository;
    private final EventMapperImpl eventMapper;
    private final SponsorRepository sponsorRepository;
    private final AreasOfInterestRepository areasOfInterestRepository;
    private final ImageRepository imageRepository;

    @Override
    public EventDto save(EventDto eventDto) {
        eventDto.setId(null);
        return eventMapper.toDTO(
                eventRepository.save(eventMapper.toEntity(eventDto))
        );
    }

    @Override
    public EventDto update(EventDto eventDto) {
        Event event = eventRepository.findById(eventDto.getId())
                .orElseThrow(()->new NotFoundException("Event not found"));

        if (eventDto.getTitle() != null) {
            event.setTitle(eventDto.getTitle());
        }
        if (eventDto.getEventType() != null) {
            event.setEventType(eventDto.getEventType());
        }
        if (eventDto.getDescription() != null) {
            event.setDescription(eventDto.getDescription());
        }
        if (eventDto.getSponsored() != null) {
            event.setSponsored(eventDto.getSponsored());
        }
        if (eventDto.getRegistrationDeadline() != null) {
            event.setRegistrationDeadline(eventDto.getRegistrationDeadline());
        }
        if (eventDto.getRegistrationOpen() != null) {
            event.setRegistrationOpen(eventDto.getRegistrationOpen());
        }
        if(eventDto.getSponsors() != null && !eventDto.getSponsors().isEmpty()) {

            Set<Sponsor> sponsors = eventDto.getSponsors().stream()
                    .map(dto -> sponsorRepository.findById(dto.getId())
                            .orElseThrow(() -> new NotFoundException("Sponsor not found with id: " + dto.getId())))
                    .collect(Collectors.toSet());
            event.setSponsors(sponsors);
        }
        if(eventDto.getAreaOfInterests() != null && !eventDto.getAreaOfInterests().isEmpty()) {
        Set<AreaOfInterest> areas = eventDto.getAreaOfInterests().stream()
                .map(dto -> areasOfInterestRepository.findById(dto.getId())
                        .orElseThrow(() -> new NotFoundException("Area not found with id: " + dto.getId())))
                .collect(Collectors.toSet());
        event.setAreaOfInterests(areas);}
        //TODO
        if (eventDto.getImage() != null) {
            Image image = imageRepository.findById(eventDto.getImage().getId())
                    .orElseThrow(() -> new NotFoundException("Image not found"));
            event.setImage(image);
        }

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
