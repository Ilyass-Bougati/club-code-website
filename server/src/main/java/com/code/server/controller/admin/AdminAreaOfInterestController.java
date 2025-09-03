package com.code.server.controller.admin;

import com.code.server.dto.areaOfInterest.AreaOfInterestDto;
import com.code.server.service.areasOfInterest.AreasOfInterestService;
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
@RequestMapping("/admin/areas-of-interest")
@RequiredArgsConstructor
public class AdminAreaOfInterestController {

    private final AreasOfInterestService areasOfInterestService;

    @Autowired
    private Validator validator;

    @GetMapping
    public String list(Model model) {
        List<AreaOfInterestDto> areas = areasOfInterestService.findAll();
        model.addAttribute("areas", areas);
        return "admin/areas-of-interest/list";
    }

    @GetMapping("/new")
    public String createForm(Model model) {
        model.addAttribute("area", new AreaOfInterestDto());
        return "admin/areas-of-interest/form";
    }

    @PostMapping
    public String create(@ModelAttribute("area") AreaOfInterestDto area,
                         BindingResult bindingResult) {

        validator.validate(area, bindingResult);

        if (bindingResult.hasErrors()) {
            return "admin/areas-of-interest/form";
        }

        areasOfInterestService.save(area);
        return "redirect:/admin/areas-of-interest";
    }

    @GetMapping("/{id}/edit")
    public String editForm(@PathVariable UUID id, Model model) {
        AreaOfInterestDto area = areasOfInterestService.findById(id);
        model.addAttribute("area", area);
        return "admin/areas-of-interest/form";
    }

    @PostMapping("/{id}")
    public String update(@PathVariable UUID id,
                         @ModelAttribute("area") AreaOfInterestDto area,
                         BindingResult bindingResult) {

        area.setId(id);

        validator.validate(area, bindingResult);

        if (bindingResult.hasErrors()) {
            return "admin/areas-of-interest/form";
        }

        areasOfInterestService.update(area);
        return "redirect:/admin/areas-of-interest";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable UUID id) {
        areasOfInterestService.delete(id);
        return "redirect:/admin/areas-of-interest";
    }
}
