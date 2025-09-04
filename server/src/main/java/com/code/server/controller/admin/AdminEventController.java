package com.code.server.controller.admin;

import com.code.server.dto.areaOfInterest.AreaOfInterestDto;
import com.code.server.dto.event.AdminEventDto;
import com.code.server.dto.image.ImageDto;
import com.code.server.dto.member.MemberDto;
import com.code.server.dto.sponsor.SponsorDto;
import com.code.server.service.event.admin.AdminEventService;
import com.code.server.service.Image.ImageService;
import com.code.server.service.member.security.CustomUserDetails;
import com.code.server.repository.AreasOfInterestRepository;
import com.code.server.repository.SponsorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/admin/events")
@RequiredArgsConstructor
@Slf4j
public class AdminEventController {
    private final AdminEventService adminEventService;
    private final ImageService imageService;
    private final AreasOfInterestRepository areasOfInterestRepository;
    private final SponsorRepository sponsorRepository;

    @GetMapping
    public String list(Model model) {
        List<AdminEventDto> events = adminEventService.findAll();
        model.addAttribute("events", events);
        return "admin/events/list";
    }

    @GetMapping("/new")
    public String createForm(Model model) {
        AdminEventDto eventDto = new AdminEventDto();
        eventDto.setSponsored(false);
        eventDto.setRegistrationOpen(false);
        eventDto.setPublished(true);
        
        List<AreaOfInterestDto> areasOfInterest = areasOfInterestRepository.findAll().stream()
                .map(area -> AreaOfInterestDto.builder()
                        .id(area.getId())
                        .name(area.getName())
                        .build())
                .toList();
        
        List<SponsorDto> sponsors = sponsorRepository.findAll().stream()
                .map(sponsor -> SponsorDto.builder()
                        .id(sponsor.getId())
                        .name(sponsor.getName())
                        .build())
                .toList();
        
        model.addAttribute("eventItem", eventDto);
        model.addAttribute("areasOfInterest", areasOfInterest);
        model.addAttribute("sponsors", sponsors);
        return "admin/events/form";
    }

    @PostMapping
    public String create(@ModelAttribute("eventItem") AdminEventDto dto,
                         BindingResult result,
                         @RequestParam(value = "imageFile", required = false) org.springframework.web.multipart.MultipartFile imageFile,
                         @AuthenticationPrincipal CustomUserDetails userDetails) {
        
        dto.setMember(com.code.server.dto.member.MemberDto.builder()
                .id(userDetails.getMember().getId())
                .build());
        
        if (imageFile != null && !imageFile.isEmpty()) {
            ImageDto uploaded = imageService.uploadImage(imageFile);
            dto.setImage(uploaded);
        }
        
        if (dto.getImage() == null) {
            result.rejectValue("image", "NotNull", "Image is required");
        }
        
        if (result.hasErrors()) {
            List<AreaOfInterestDto> areasOfInterest = areasOfInterestRepository.findAll().stream()
                    .map(area -> AreaOfInterestDto.builder()
                            .id(area.getId())
                            .name(area.getName())
                            .build())
                    .toList();
            
            List<SponsorDto> sponsors = sponsorRepository.findAll().stream()
                    .map(sponsor -> SponsorDto.builder()
                            .id(sponsor.getId())
                            .name(sponsor.getName())
                            .build())
                    .toList();
            
            return "admin/events/form";
        }
        
        adminEventService.save(dto);
        return "redirect:/admin/events";
    }

    @PostMapping("/save")
    public String save(@ModelAttribute("eventItem") AdminEventDto dto,
                       BindingResult result,
                       @RequestParam(value = "imageFile", required = false) org.springframework.web.multipart.MultipartFile imageFile,
                       @AuthenticationPrincipal CustomUserDetails userDetails) {
        
        if (dto.getMember() == null || dto.getMember().getId() == null) {
            dto.setMember(com.code.server.dto.member.MemberDto.builder()
                    .id(userDetails.getMember().getId())
                    .build());
        }
        
        if (imageFile != null && !imageFile.isEmpty()) {
            ImageDto uploaded = imageService.uploadImage(imageFile);
            dto.setImage(uploaded);
        }
        
        if (result.hasErrors()) {
            List<AreaOfInterestDto> areasOfInterest = areasOfInterestRepository.findAll().stream()
                    .map(area -> AreaOfInterestDto.builder()
                            .id(area.getId())
                            .name(area.getName())
                            .build())
                    .toList();
            
            List<SponsorDto> sponsors = sponsorRepository.findAll().stream()
                    .map(sponsor -> SponsorDto.builder()
                            .id(sponsor.getId())
                            .name(sponsor.getName())
                            .build())
                    .toList();
            
            return "admin/events/form";
        }
        
        if (dto.getId() == null) {
            adminEventService.save(dto);
        } else {
            adminEventService.update(dto);
        }
        return "redirect:/admin/events";
    }

    @GetMapping("/{id}/edit")
    public String editForm(@PathVariable UUID id, Model model) {
        AdminEventDto eventDto = adminEventService.findById(id);
        
        List<AreaOfInterestDto> areasOfInterest = areasOfInterestRepository.findAll().stream()
                .map(area -> AreaOfInterestDto.builder()
                        .id(area.getId())
                        .name(area.getName())
                        .build())
                .toList();
        
        List<SponsorDto> sponsors = sponsorRepository.findAll().stream()
                .map(sponsor -> SponsorDto.builder()
                        .id(sponsor.getId())
                        .name(sponsor.getName())
                        .build())
                .toList();
        
        model.addAttribute("eventItem", eventDto);
        model.addAttribute("areasOfInterest", areasOfInterest);
        model.addAttribute("sponsors", sponsors);
        return "admin/events/form";
    }

    @PostMapping("/{id}")
    public String update(@PathVariable UUID id,
                         @ModelAttribute("eventItem") AdminEventDto dto,
                         BindingResult result,
                         @RequestParam(value = "imageFile", required = false) org.springframework.web.multipart.MultipartFile imageFile) {
        dto.setId(id);
        
        if (imageFile != null && !imageFile.isEmpty()) {
            ImageDto uploaded = imageService.uploadImage(imageFile);
            dto.setImage(uploaded);
        }
        
        if (result.hasErrors()) {
            List<AreaOfInterestDto> areasOfInterest = areasOfInterestRepository.findAll().stream()
                    .map(area -> AreaOfInterestDto.builder()
                            .id(area.getId())
                            .name(area.getName())
                            .build())
                    .toList();
            
            List<SponsorDto> sponsors = sponsorRepository.findAll().stream()
                    .map(sponsor -> SponsorDto.builder()
                            .id(sponsor.getId())
                            .name(sponsor.getName())
                            .build())
                    .toList();
            
            return "admin/events/form";
        }
        
        adminEventService.update(dto);
        return "redirect:/admin/events";
    }

    @DeleteMapping("/{id}/delete")
    public String delete(@PathVariable UUID id) {
        log.info("Attempting to delete event with ID: {}", id);
        adminEventService.delete(id);
        log.info("Event with ID {} deleted successfully", id);
        return "redirect:/admin/events";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAlt(@PathVariable UUID id) {
        log.info("Attempting to delete event with ID: {}", id);
        adminEventService.delete(id);
        log.info("Event with ID {} deleted successfully", id);
        return "redirect:/admin/events";
    }

    @GetMapping("/{id}")
    public String viewEvent(@PathVariable UUID id, Model model) {
        AdminEventDto event = adminEventService.findById(id);
        model.addAttribute("event", event);
        return "admin/events/details";
    }

    @GetMapping("/{id}/members")
    public String manageMembers(@PathVariable UUID id, Model model) {
        AdminEventDto event = adminEventService.findById(id);
        List<MemberDto> eventMembers = adminEventService.getEventMembers(id);
        List<MemberDto> availableMembers = adminEventService.getAvailableMembers(id);
        
        model.addAttribute("event", event);
        model.addAttribute("eventMembers", eventMembers);
        model.addAttribute("availableMembers", availableMembers);
        return "admin/events/manage-members";
    }

    @PostMapping("/{id}/members/add")
    public String addMember(@PathVariable UUID id, @RequestParam UUID memberId) {
        adminEventService.addMemberToEvent(id, memberId);
        return "redirect:/admin/events/" + id + "/members";
    }

    @PostMapping("/{id}/members/remove")
    public String removeMember(@PathVariable UUID id, @RequestParam UUID memberId) {
        adminEventService.removeMemberFromEvent(id, memberId);
        return "redirect:/admin/events/" + id + "/members";
    }

    @GetMapping("/{id}/export")
    public ResponseEntity<byte[]> exportEventToCsv(@PathVariable UUID id) throws IOException {
        AdminEventDto event = adminEventService.findById(id);
        
        // Create CSV content
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (Writer writer = new OutputStreamWriter(baos, StandardCharsets.UTF_8)) {
            // Write CSV header
            writer.write("Event Information\n");
            writer.write("Field,Value\n");
            writer.write("ID," + event.getId() + "\n");
            writer.write("Title," + escapeCsvField(event.getTitle()) + "\n");
            writer.write("Description," + escapeCsvField(event.getDescription()) + "\n");
            writer.write("Event Type," + (event.getEventType() != null ? event.getEventType().toString() : "") + "\n");
            writer.write("Sponsored," + (event.getSponsored() != null ? event.getSponsored().toString() : "") + "\n");
            writer.write("Registration Open," + (event.getRegistrationOpen() != null ? event.getRegistrationOpen().toString() : "") + "\n");
            writer.write("Published," + (event.getPublished() != null ? event.getPublished().toString() : "") + "\n");
            
            if (event.getRegistrationDeadline() != null) {
                writer.write("Registration Deadline," + event.getRegistrationDeadline().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + "\n");
            }
            
            if (event.getPublishedAt() != null) {
                writer.write("Published At," + event.getPublishedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + "\n");
            }
            
            if (event.getMember() != null) {
                writer.write("Created By," + escapeCsvField(event.getMember().getFirstName() + " " + event.getMember().getLastName()) + "\n");
                writer.write("Creator Email," + escapeCsvField(event.getMember().getEmail()) + "\n");
                writer.write("Creator Phone," + escapeCsvField(event.getMember().getPhoneNumber() != null ? event.getMember().getPhoneNumber() : "") + "\n");
            }
            
            if (event.getImage() != null) {
                writer.write("Image URI," + escapeCsvField(event.getImage().getUri()) + "\n");
            }
            
            // Areas of Interest
            if (event.getAreaOfInterests() != null && !event.getAreaOfInterests().isEmpty()) {
                writer.write("Areas of Interest," + escapeCsvField(event.getAreaOfInterests().stream()
                        .map(area -> area.getName())
                        .reduce("", (a, b) -> a + "; " + b).substring(2)) + "\n");
            }
            
            // Sponsors
            if (event.getSponsors() != null && !event.getSponsors().isEmpty()) {
                writer.write("Sponsors," + escapeCsvField(event.getSponsors().stream()
                        .map(sponsor -> sponsor.getName())
                        .reduce("", (a, b) -> a + "; " + b).substring(2)) + "\n");
            }
            
            // Members
            if (event.getMembers() != null && !event.getMembers().isEmpty()) {
                writer.write("\nInterested Members\n");
                writer.write("Name,Email,Phone Number,Member Since\n");
                
                for (MemberDto member : event.getMembers()) {
                    writer.write(escapeCsvField(member.getFirstName() + " " + member.getLastName()) + ",");
                    writer.write(escapeCsvField(member.getEmail()) + ",");
                    writer.write(escapeCsvField(member.getPhoneNumber() != null ? member.getPhoneNumber() : "") + ",");
                    if (member.getCreatedAt() != null) {
                        writer.write(member.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + "\n");
                    } else {
                        writer.write("\n");
                    }
                }
            }
        }
        
        byte[] csvContent = baos.toByteArray();
        
        // Create filename with event title
        String filename = "event-" + (event.getTitle() != null ? event.getTitle().replaceAll("[^a-zA-Z0-9\\s-]", "").replaceAll("\\s+", "-") : "unknown") + ".csv";
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/csv"));
        headers.setContentDispositionFormData("attachment", filename);
        headers.setContentLength(csvContent.length);
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(csvContent);
    }
    
    private String escapeCsvField(String field) {
        if (field == null) return "";
        if (field.contains(",") || field.contains("\n") || field.contains("\"") || field.contains("\r")) {
            return "\"" + field.replace("\"", "\"\"") + "\"";
        }
        return field;
    }
}


