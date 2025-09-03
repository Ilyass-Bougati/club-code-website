package com.code.server.controller.admin;

import com.code.server.dto.sponsor.SponsorDto;
import com.code.server.dto.sponsor.SponsorMapper;
import com.code.server.repository.SponsorRepository;
import com.code.server.service.sponsor.SponsorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/admin/sponsors")
@RequiredArgsConstructor
public class AdminSponsorController {

    private final SponsorService sponsorService;
    private final SponsorRepository sponsorRepository;
    private final SponsorMapper sponsorMapper;

    @Autowired
    private Validator validator;

    @GetMapping
    public String list(Model model) {
        List<SponsorDto> sponsors = sponsorRepository.findAll()
                .stream()
                .map(sponsorMapper::toDTO)
                .toList();
        model.addAttribute("sponsors", sponsors);
        return "admin/sponsors/list";
    }

    @GetMapping("/new")
    public String createForm(Model model) {
        model.addAttribute("sponsor", new SponsorDto());
        return "admin/sponsors/form";
    }

    @PostMapping
    public String create(@ModelAttribute("sponsor") SponsorDto sponsor,
                         BindingResult bindingResult) {

        validator.validate(sponsor, bindingResult);

        if (bindingResult.hasErrors()) {
            return "admin/sponsors/form";
        }

        sponsorService.save(sponsor);
        return "redirect:/admin/sponsors";
    }

    @GetMapping("/{id}/edit")
    public String editForm(@PathVariable UUID id, Model model) {
        SponsorDto sponsor = sponsorService.findById(id);
        model.addAttribute("sponsor", sponsor);
        return "admin/sponsors/form";
    }

    @PostMapping("/{id}")
    public String update(@PathVariable UUID id,
                         @ModelAttribute("sponsor") SponsorDto sponsor,
                         BindingResult bindingResult) {

        sponsor.setId(id);

        validator.validate(sponsor, bindingResult);

        if (bindingResult.hasErrors()) {
            return "admin/sponsors/form";
        }

        sponsorService.update(sponsor);
        return "redirect:/admin/sponsors";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable UUID id) {
        sponsorService.delete(id);
        return "redirect:/admin/sponsors";
    }
}
