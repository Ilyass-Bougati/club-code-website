package com.code.server.dto.event;

import com.code.server.dto.areaOfInterest.AreaOfInterestMapper;
import com.code.server.dto.image.ImageMapper;
import com.code.server.dto.sponsor.SponsorMapper;
import com.code.server.entity.Event;
import com.code.server.entity.Sponsor;
import com.code.server.service.Image.ImageEntityService;
import com.code.server.service.areasOfInterest.AreasOfInterestService;
import com.code.server.service.sponsor.SponsorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.stream.Collectors;


// TODO : Finish this when the services are implemented
@Service
@RequiredArgsConstructor
public class EventMapperImpl implements EventMapper {

    private final AreaOfInterestMapper areaOfInterestMapper;
    private final SponsorMapper sponsorMapper;
    private final ImageMapper imageMapper;
    private final ImageEntityService imageEntityService;
    private final SponsorService sponsorService;
    private final AreasOfInterestService areasOfInterestService;

    @Override
    public EventDto toDTO(Event event) {
        return EventDto.builder()
                .id(event.getId())
                .eventType(event.getEventType())
                .description(event.getDescription())
                .title(event.getTitle())
                .registrationOpen(event.getRegistrationOpen())
                .registrationDeadline(event.getRegistrationDeadline())
                .sponsored(event.getSponsored())
                .sponsors(event.getSponsors().stream().map(sponsorMapper::toDTO).toList())
                .areaOfInterests(event.getAreaOfInterests().stream().map(areaOfInterestMapper::toDTO).toList())
                .publishedAt(event.getPublishedAt())
                .image(imageMapper.toDTO(event.getImage()))
                .build();
    }

    /**
     * This function maps an event DTO to an even entity, but it doesn't map the sponsors, areas of interests, images, and staff
     * those should be added separately.
     * @param eventDto The event DTO to turn into an even entity
     * @return an event entity
     */
    @Override
    public Event toEntity(EventDto eventDto) {
        return Event.builder()
                .image(imageEntityService.findById(eventDto.getImage().getId()))
                .sponsors(eventDto.getSponsors().stream()
                        .map(sponsorDto -> sponsorMapper.toEntity(
                                sponsorService.findById(sponsorDto.getId())
                        ))
                        .collect(Collectors.toSet()))
                .areaOfInterests(eventDto.getAreaOfInterests().stream()
                        .map(areaOfInterestDto -> areaOfInterestMapper.toEntity(
                                areasOfInterestService.findById(areaOfInterestDto.getId())
                        ))
                        .collect(Collectors.toSet()))
                .eventType(eventDto.getEventType())
                .description(eventDto.getDescription())
                .title(eventDto.getTitle())
                .registrationOpen(eventDto.getRegistrationOpen())
                .registrationDeadline(eventDto.getRegistrationDeadline())
                .sponsored(eventDto.getSponsored())
                .build();
    }
}
