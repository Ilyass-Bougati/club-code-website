package com.code.server.controller.admin;

import com.code.server.dto.image.ImageDto;
import com.code.server.dto.officeMember.OfficeMemberDto;
import com.code.server.service.Image.ImageService;
import com.code.server.service.officeMember.OfficeMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.validation.Validator;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/admin/office-members")
@RequiredArgsConstructor
public class AdminOfficeMemberController {

    private final OfficeMemberService officeMemberService;
    private final ImageService imageService;

    @Autowired
    private Validator validator;

    @GetMapping
    public String list(Model model) {
        List<OfficeMemberDto> members = officeMemberService.findAll();
        model.addAttribute("members", members);
        return "admin/office-members/list";
    }

    @GetMapping("/new")
    public String createForm(Model model) {
        model.addAttribute("member", new OfficeMemberDto());
        return "admin/office-members/form";
    }

    @PostMapping
    public String create(@ModelAttribute("member") OfficeMemberDto member,
                         BindingResult bindingResult,
                         @RequestParam("imageFile") MultipartFile imageFile) {

        if (imageFile.isEmpty()) {
            bindingResult.rejectValue("image", "NotNull", "An image is required for a new member.");
        } else {
            ImageDto uploaded = imageService.uploadImage(imageFile);
            member.setImage(uploaded);
        }

        validator.validate(member, bindingResult);

        if (bindingResult.hasErrors()) {
            return "admin/office-members/form";
        }

        officeMemberService.save(member);
        return "redirect:/admin/office-members";
    }

    @GetMapping("/{id}/edit")
    public String editForm(@PathVariable UUID id, Model model) {
        OfficeMemberDto member = officeMemberService.findById(id);
        model.addAttribute("member", member);
        return "admin/office-members/form";
    }

    @PostMapping("/{id}")
    public String update(@PathVariable UUID id,
                         @ModelAttribute("member") OfficeMemberDto member,
                         BindingResult bindingResult, // Remove @Valid from here
                         @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) {

        member.setId(id);

        if (imageFile != null && !imageFile.isEmpty()) {
            ImageDto uploaded = imageService.uploadImage(imageFile);
            member.setImage(uploaded);
        } else {
            OfficeMemberDto existingMember = officeMemberService.findById(id);
            member.setImage(existingMember.getImage());
        }

        validator.validate(member, bindingResult);

        if (bindingResult.hasErrors()) {
            return "admin/office-members/form";
        }

        officeMemberService.update(member);
        return "redirect:/admin/office-members";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable UUID id) {
        officeMemberService.delete(id);
        return "redirect:/admin/office-members";
    }
}