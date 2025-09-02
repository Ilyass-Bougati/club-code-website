package com.code.server.controller.admin;

import com.code.server.entity.Member;
import com.code.server.enums.UserRole;
import com.code.server.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/admin/members")
@RequiredArgsConstructor
public class AdminMemberController {

    private final MemberRepository memberRepository;

    @GetMapping
    public String list(Model model) {
        UserRole currentUserRole = getCurrentUserRole();

        List<Member> members = memberRepository.findAll();
        model.addAttribute("members", members);
        model.addAttribute("isSuperAdmin", isSuperAdmin(currentUserRole));
        model.addAttribute("isAdmin", isAdmin(currentUserRole));
        model.addAttribute("currentUserRole", currentUserRole);
        return "admin/members/list";
    }

    @GetMapping("/new")
    public String createForm(Model model, RedirectAttributes redirectAttributes) {
        UserRole currentUserRole = getCurrentUserRole();

        if (!isAdmin(currentUserRole)) {
            redirectAttributes.addFlashAttribute("error", "Only ADMIN and SUPER_ADMIN users can create new members.");
            return "redirect:/admin/members";
        }

        Member newMember = new Member();
        if (currentUserRole == UserRole.SUPER_ADMIN) {
            newMember.setRole(UserRole.USER);
        } else {
            newMember.setRole(UserRole.USER);
        }

        model.addAttribute("member", newMember);
        model.addAttribute("userRoles", getAvailableRoles(currentUserRole));
        model.addAttribute("isSuperAdmin", isSuperAdmin(currentUserRole));
        model.addAttribute("isAdmin", isAdmin(currentUserRole));
        model.addAttribute("currentUserRole", currentUserRole);
        return "admin/members/form";
    }

    @PostMapping
    public String create(@ModelAttribute("member") Member member,
                         BindingResult bindingResult,
                         RedirectAttributes redirectAttributes,
                         Model model) {

        UserRole currentUserRole = getCurrentUserRole();

        if (!isAdmin(currentUserRole)) {
            redirectAttributes.addFlashAttribute("error", "Only ADMIN and SUPER_ADMIN users can create new members.");
            return "redirect:/admin/members";
        }

        if (member.getFirstName() == null || member.getFirstName().trim().isEmpty()) {
            bindingResult.rejectValue("firstName", "NotBlank", "First name is required");
        }
        if (member.getLastName() == null || member.getLastName().trim().isEmpty()) {
            bindingResult.rejectValue("lastName", "NotBlank", "Last name is required");
        }
        if (member.getEmail() == null || member.getEmail().trim().isEmpty()) {
            bindingResult.rejectValue("email", "NotBlank", "Email is required");
        }
        if (member.getPhoneNumber() == null || member.getPhoneNumber().trim().isEmpty()) {
            bindingResult.rejectValue("phoneNumber", "NotBlank", "Phone number is required");
        }
        if (member.getMajor() == null || member.getMajor().trim().isEmpty()) {
            bindingResult.rejectValue("major", "NotBlank", "Major is required");
        }
        if (member.getYear() == null) {
            bindingResult.rejectValue("year", "NotNull", "Year is required");
        }
        if (member.getPassword() == null || member.getPassword().trim().isEmpty()) {
            bindingResult.rejectValue("password", "NotBlank", "Password is required");
        }

        if (bindingResult.hasErrors()) {
            model.addAttribute("userRoles", getAvailableRoles(currentUserRole));
            model.addAttribute("isSuperAdmin", isSuperAdmin(currentUserRole));
            model.addAttribute("isAdmin", isAdmin(currentUserRole));
            model.addAttribute("currentUserRole", currentUserRole);
            return "admin/members/form";
        }

        if (currentUserRole == UserRole.SUPER_ADMIN) {
            if (member.getRole() == null) {
                member.setRole(UserRole.USER);
            }
        } else if (currentUserRole == UserRole.ADMIN) {
            member.setRole(UserRole.USER);
        }

        try {
            memberRepository.save(member);
            redirectAttributes.addFlashAttribute("success", "Member created successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error creating member: " + e.getMessage());
        }

        return "redirect:/admin/members";
    }

    @GetMapping("/{id}/edit")
    public String editForm(@PathVariable UUID id, Model model, RedirectAttributes redirectAttributes) {
        UserRole currentUserRole = getCurrentUserRole();

        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        boolean canEdit = canManageMember(member, currentUserRole);

        if (!canEdit) {
            redirectAttributes.addFlashAttribute("error", "You don't have permission to edit this member.");
            return "redirect:/admin/members";
        }

        model.addAttribute("member", member);
        model.addAttribute("userRoles", getAvailableRoles(currentUserRole));
        model.addAttribute("isSuperAdmin", isSuperAdmin(currentUserRole));
        model.addAttribute("isAdmin", isAdmin(currentUserRole));
        model.addAttribute("currentUserRole", currentUserRole);
        model.addAttribute("canEdit", canEdit);
        model.addAttribute("canChangeRole", canChangeRole(member, currentUserRole));
        return "admin/members/form";
    }

    @PutMapping("/{id}")
    public String update(@PathVariable UUID id,
                         @ModelAttribute("member") Member member,
                         BindingResult bindingResult,
                         RedirectAttributes redirectAttributes,
                         Model model) {

        UserRole currentUserRole = getCurrentUserRole();

        Member existingMember = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        if (!canManageMember(existingMember, currentUserRole)) {
            redirectAttributes.addFlashAttribute("error", "You don't have permission to update this member.");
            return "redirect:/admin/members";
        }

        member.setId(id);
        member.setCreatedAt(existingMember.getCreatedAt());
        
        member.setPassword(existingMember.getPassword());

        if (member.getFirstName() == null || member.getFirstName().trim().isEmpty()) {
            bindingResult.rejectValue("firstName", "NotBlank", "First name is required");
        }
        if (member.getLastName() == null || member.getLastName().trim().isEmpty()) {
            bindingResult.rejectValue("lastName", "NotBlank", "Last name is required");
        }
        if (member.getEmail() == null || member.getEmail().trim().isEmpty()) {
            bindingResult.rejectValue("email", "NotBlank", "Email is required");
        }
        if (member.getPhoneNumber() == null || member.getPhoneNumber().trim().isEmpty()) {
            bindingResult.rejectValue("phoneNumber", "NotBlank", "Phone number is required");
        }
        if (member.getMajor() == null || member.getMajor().trim().isEmpty()) {
            bindingResult.rejectValue("major", "NotBlank", "Major is required");
        }
        if (member.getYear() == null) {
            bindingResult.rejectValue("year", "NotNull", "Year is required");
        }

        if (bindingResult.hasErrors()) {
            model.addAttribute("userRoles", getAvailableRoles(currentUserRole));
            model.addAttribute("isSuperAdmin", isSuperAdmin(currentUserRole));
            model.addAttribute("isAdmin", isAdmin(currentUserRole));
            model.addAttribute("currentUserRole", currentUserRole);
            model.addAttribute("canEdit", true);
            model.addAttribute("canChangeRole", canChangeRole(existingMember, currentUserRole));
            return "admin/members/form";
        }

        if (currentUserRole == UserRole.SUPER_ADMIN) {
            if (member.getRole() == null) {
                member.setRole(existingMember.getRole());
            }
        } else {
            member.setRole(existingMember.getRole());
        }

        try {
            Member savedMember = memberRepository.save(member);
            redirectAttributes.addFlashAttribute("success", "Member updated successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error updating member: " + e.getMessage());
            return "redirect:/admin/members";
        }

        return "redirect:/admin/members";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable UUID id, RedirectAttributes redirectAttributes) {
        UserRole currentUserRole = getCurrentUserRole();

        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        if (!canManageMember(member, currentUserRole)) {
            redirectAttributes.addFlashAttribute("error", "You don't have permission to delete this member.");
            return "redirect:/admin/members";
        }

        try {
            memberRepository.deleteById(id);
            redirectAttributes.addFlashAttribute("success", "Member deleted successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error deleting member: " + e.getMessage());
        }

        return "redirect:/admin/members";
    }

    private boolean isSuperAdmin(UserRole currentUserRole) {
        return currentUserRole == UserRole.SUPER_ADMIN;
    }

    private boolean isAdmin(UserRole currentUserRole) {
        return currentUserRole == UserRole.ADMIN || currentUserRole == UserRole.SUPER_ADMIN;
    }

    private UserRole getCurrentUserRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getName() != null) {
            String email = authentication.getName();
            try {
                return memberRepository.findByEmail(email)
                        .map(Member::getRole)
                        .orElse(UserRole.ADMIN);
            } catch (Exception e) {
                System.err.println("Error getting current user role: " + e.getMessage());
                return UserRole.ADMIN;
            }
        }
        return UserRole.ADMIN;
    }

    private boolean canManageMember(Member targetMember, UserRole currentUserRole) {
        if (currentUserRole == UserRole.SUPER_ADMIN) {
            return true;
        } else if (currentUserRole == UserRole.ADMIN) {
            return targetMember.getRole() == UserRole.USER;
        }

        return false;
    }

    private boolean canChangeRole(Member targetMember, UserRole currentUserRole) {
        return currentUserRole == UserRole.SUPER_ADMIN;
    }

    private UserRole[] getAvailableRoles(UserRole currentUserRole) {
        if (currentUserRole == UserRole.SUPER_ADMIN) {
            return UserRole.values();
        } else {
            return new UserRole[]{UserRole.USER};
        }
    }
}