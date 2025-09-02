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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/admin/events")
@RequiredArgsConstructor
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

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable UUID id) {
        adminEventService.delete(id);
        return "redirect:/admin/events";
    }

    @PostMapping("/delete/{id}")
    public String deleteAlt(@PathVariable UUID id) {
        adminEventService.delete(id);
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
}


