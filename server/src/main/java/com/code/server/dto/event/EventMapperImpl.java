package com.code.server.dto.event;

import com.code.server.dto.areaOfInterest.AreaOfInterestMapper;
import com.code.server.dto.image.ImageMapper;
import com.code.server.dto.sponsor.SponsorMapper;
import com.code.server.entity.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


// TODO : Finish this when the services are implemented
@Service
@RequiredArgsConstructor
public class EventMapperImpl implements EventMapper {

    private final AreaOfInterestMapper areaOfInterestMapper;
    private final SponsorMapper sponsorMapper;
    private final ImageMapper imageMapper;

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
                .id(eventDto.getId())
                .eventType(eventDto.getEventType())
                .description(eventDto.getDescription())
                .title(eventDto.getTitle())
                .registrationOpen(eventDto.getRegistrationOpen())
                .registrationDeadline(eventDto.getRegistrationDeadline())
                .sponsored(eventDto.getSponsored())
                .build();
    }
}
