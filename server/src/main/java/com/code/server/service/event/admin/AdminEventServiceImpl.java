package com.code.server.service.event.admin;

import com.code.server.dto.areaOfInterest.AreaOfInterestDto;
import com.code.server.dto.event.AdminEventDto;
import com.code.server.dto.image.ImageDto;
import com.code.server.dto.member.MemberDto;
import com.code.server.dto.sponsor.SponsorDto;
import com.code.server.entity.AreaOfInterest;
import com.code.server.entity.Event;
import com.code.server.entity.Image;
import com.code.server.entity.Member;
import com.code.server.entity.Sponsor;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.AreasOfInterestRepository;
import com.code.server.repository.EventRepository;
import com.code.server.repository.ImageRepository;
import com.code.server.repository.MemberRepository;
import com.code.server.repository.SponsorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminEventServiceImpl implements AdminEventService {

    private final EventRepository eventRepository;
    private final AreasOfInterestRepository areasOfInterestRepository;
    private final SponsorRepository sponsorRepository;
    private final ImageRepository imageRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional(readOnly = true)
    public List<AdminEventDto> findAll() {
        return eventRepository.findAll()
                .stream()
                .map(this::mapToAdminDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AdminEventDto findById(UUID id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Event not found with id: " + id));
        return mapToAdminDto(event);
    }

    @Override
    public AdminEventDto save(AdminEventDto dto) {
        Event event = mapToEntity(dto);
        event.setPublishedAt(LocalDateTime.now());
        Event savedEvent = eventRepository.save(event);
        return mapToAdminDto(savedEvent);
    }

    @Override
    public AdminEventDto update(AdminEventDto dto) {
        Event existingEvent = eventRepository.findById(dto.getId())
                .orElseThrow(() -> new NotFoundException("Event not found with id: " + dto.getId()));
        
        updateEventFromDto(existingEvent, dto);
        Event updatedEvent = eventRepository.save(existingEvent);
        return mapToAdminDto(updatedEvent);
    }

    @Override
    public void delete(UUID id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Event not found with id: " + id));
        eventRepository.delete(event);
    }

    @Override
    public List<MemberDto> getEventMembers(UUID eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new NotFoundException("Event not found with id: " + eventId));
        
        if (event.getMembers() == null) {
            return new ArrayList<>();
        }
        
        return event.getMembers().stream()
                .map(member -> MemberDto.builder()
                        .id(member.getId())
                        .firstName(member.getFirstName())
                        .lastName(member.getLastName())
                        .email(member.getEmail())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public void addMemberToEvent(UUID eventId, UUID memberId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new NotFoundException("Event not found with id: " + eventId));
        
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException("Member not found with id: " + memberId));
        
        if (event.getMembers() == null) {
            event.setMembers(new HashSet<>());
        }
        
        event.getMembers().add(member);
        eventRepository.save(event);
    }

    @Override
    public void removeMemberFromEvent(UUID eventId, UUID memberId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new NotFoundException("Event not found with id: " + eventId));
        
        if (event.getMembers() != null) {
            event.getMembers().removeIf(member -> member.getId().equals(memberId));
            eventRepository.save(event);
        }
    }

    @Override
    public List<MemberDto> getAvailableMembers(UUID eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new NotFoundException("Event not found with id: " + eventId));
        
        List<Member> allMembers = memberRepository.findAll();
        Set<UUID> eventMemberIds = event.getMembers() != null ? 
                event.getMembers().stream().map(Member::getId).collect(Collectors.toSet()) : 
                new HashSet<>();
        
        return allMembers.stream()
                .filter(member -> !eventMemberIds.contains(member.getId()))
                .map(member -> MemberDto.builder()
                        .id(member.getId())
                        .firstName(member.getFirstName())
                        .lastName(member.getLastName())
                        .email(member.getEmail())
                        .build())
                .collect(Collectors.toList());
    }

    private Event mapToEntity(AdminEventDto dto) {
        Event event = Event.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .eventType(dto.getEventType())
                .sponsored(dto.getSponsored())
                .registrationOpen(dto.getRegistrationOpen())
                .registrationDeadline(dto.getRegistrationDeadline())
                .published(dto.getPublished())
                .build();

        if (dto.getImage() != null && dto.getImage().getId() != null) {
            Image image = imageRepository.findById(dto.getImage().getId())
                    .orElseThrow(() -> new NotFoundException("Image not found with id: " + dto.getImage().getId()));
            event.setImage(image);
        }

        if (dto.getMember() != null && dto.getMember().getId() != null) {
            Member member = memberRepository.findById(dto.getMember().getId())
                    .orElseThrow(() -> new NotFoundException("Member not found with id: " + dto.getMember().getId()));
            event.setMember(member);
        }

        if (dto.getAreaOfInterests() != null && !dto.getAreaOfInterests().isEmpty()) {
            Set<AreaOfInterest> areas = dto.getAreaOfInterests().stream()
                    .map(areaDto -> areasOfInterestRepository.findById(areaDto.getId())
                            .orElseThrow(() -> new NotFoundException("Area of interest not found with id: " + areaDto.getId())))
                    .collect(Collectors.toSet());
            event.setAreaOfInterests(areas);
        }

        if (dto.getSponsors() != null && !dto.getSponsors().isEmpty()) {
            Set<Sponsor> sponsors = dto.getSponsors().stream()
                    .map(sponsorDto -> sponsorRepository.findById(sponsorDto.getId())
                            .orElseThrow(() -> new NotFoundException("Sponsor not found with id: " + sponsorDto.getId())))
                    .collect(Collectors.toSet());
            event.setSponsors(sponsors);
        }

        if (dto.getMembers() != null && !dto.getMembers().isEmpty()) {
            Set<Member> members = dto.getMembers().stream()
                    .map(memberDto -> memberRepository.findById(memberDto.getId())
                            .orElseThrow(() -> new NotFoundException("Member not found with id: " + memberDto.getId())))
                    .collect(Collectors.toSet());
            event.setMembers(members);
        }

        return event;
    }

    private void updateEventFromDto(Event event, AdminEventDto dto) {
        if (dto.getTitle() != null) {
            event.setTitle(dto.getTitle());
        }
        if (dto.getDescription() != null) {
            event.setDescription(dto.getDescription());
        }
        if (dto.getEventType() != null) {
            event.setEventType(dto.getEventType());
        }
        if (dto.getSponsored() != null) {
            event.setSponsored(dto.getSponsored());
        }
        if (dto.getRegistrationOpen() != null) {
            event.setRegistrationOpen(dto.getRegistrationOpen());
        }
        if (dto.getRegistrationDeadline() != null) {
            event.setRegistrationDeadline(dto.getRegistrationDeadline());
        }
        if (dto.getPublished() != null) {
            event.setPublished(dto.getPublished());
        }

        if (dto.getImage() != null && dto.getImage().getId() != null) {
            Image image = imageRepository.findById(dto.getImage().getId())
                    .orElseThrow(() -> new NotFoundException("Image not found with id: " + dto.getImage().getId()));
            event.setImage(image);
        }

        if (dto.getMember() != null && dto.getMember().getId() != null) {
            Member member = memberRepository.findById(dto.getMember().getId())
                    .orElseThrow(() -> new NotFoundException("Member not found with id: " + dto.getMember().getId()));
            event.setMember(member);
        }

        if (dto.getAreaOfInterests() != null) {
            Set<AreaOfInterest> areas = dto.getAreaOfInterests().stream()
                    .map(areaDto -> areasOfInterestRepository.findById(areaDto.getId())
                            .orElseThrow(() -> new NotFoundException("Area of interest not found with id: " + areaDto.getId())))
                    .collect(Collectors.toSet());
            event.setAreaOfInterests(areas);
        }

        if (dto.getSponsors() != null) {
            Set<Sponsor> sponsors = dto.getSponsors().stream()
                    .map(sponsorDto -> sponsorRepository.findById(sponsorDto.getId())
                            .orElseThrow(() -> new NotFoundException("Sponsor not found with id: " + sponsorDto.getId())))
                    .collect(Collectors.toSet());
            event.setSponsors(sponsors);
        }

        if (dto.getMembers() != null) {
            Set<Member> members = dto.getMembers().stream()
                    .map(memberDto -> memberRepository.findById(memberDto.getId())
                            .orElseThrow(() -> new NotFoundException("Member not found with id: " + memberDto.getId())))
                    .collect(Collectors.toSet());
            event.setMembers(members);
        }
    }

    private AdminEventDto mapToAdminDto(Event event) {
        AdminEventDto dto = AdminEventDto.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .eventType(event.getEventType())
                .sponsored(event.getSponsored())
                .registrationOpen(event.getRegistrationOpen())
                .registrationDeadline(event.getRegistrationDeadline())
                .publishedAt(event.getPublishedAt())
                .published(event.getPublished())
                .build();

        // Map image
        if (event.getImage() != null) {
            dto.setImage(ImageDto.builder()
                    .id(event.getImage().getId())
                    .uri(event.getImage().getUri())
                    .host(event.getImage().getHost())
                    .build());
        }

        // Map member
        if (event.getMember() != null) {
            dto.setMember(MemberDto.builder()
                    .id(event.getMember().getId())
                    .firstName(event.getMember().getFirstName())
                    .lastName(event.getMember().getLastName())
                    .email(event.getMember().getEmail())
                    .build());
        }

        // Map areas of interest
        if (event.getAreaOfInterests() != null) {
            dto.setAreaOfInterests(event.getAreaOfInterests().stream()
                    .map(area -> AreaOfInterestDto.builder()
                            .id(area.getId())
                            .name(area.getName())
                            .build())
                    .collect(Collectors.toList()));
        }

        // Map sponsors
        if (event.getSponsors() != null) {
            dto.setSponsors(event.getSponsors().stream()
                    .map(sponsor -> SponsorDto.builder()
                            .id(sponsor.getId())
                            .name(sponsor.getName())
                            .build())
                    .collect(Collectors.toList()));
        }

        // Map members
        if (event.getMembers() != null) {
            dto.setMembers(event.getMembers().stream()
                    .map(member -> MemberDto.builder()
                            .id(member.getId())
                            .firstName(member.getFirstName())
                            .lastName(member.getLastName())
                            .email(member.getEmail())
                            .build())
                    .collect(Collectors.toList()));
        }

        return dto;
    }
}
