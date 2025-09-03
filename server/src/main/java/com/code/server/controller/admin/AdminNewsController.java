package com.code.server.controller.admin;

import com.code.server.dto.image.ImageDto;
import com.code.server.dto.news.NewsDto;
import com.code.server.entity.News;
import com.code.server.service.news.NewsService;
import com.code.server.service.Image.ImageService;
import com.code.server.service.member.security.CustomUserDetails;
import com.code.server.repository.NewsRepository;
import com.code.server.repository.MemberRepository;
import com.code.server.dto.news.NewsMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/admin/news")
@RequiredArgsConstructor
public class AdminNewsController {
    private final NewsService newsService;
    private final ImageService imageService;
    private final NewsRepository newsRepository;
    private final MemberRepository memberRepository;
    private final NewsMapper newsMapper;

    @Autowired
    private Validator validator;

    @GetMapping
    public String list(Model model) {
        List<News> news = newsRepository.findAll();
        model.addAttribute("newsList", news);
        return "admin/news/list";
    }

    @GetMapping("/new")
    public String createForm(Model model) {
        model.addAttribute("news", new NewsDto());
        return "admin/news/form";
    }

    @PostMapping
    public String create(@ModelAttribute("news") NewsDto newsDto,
                         BindingResult bindingResult,
                         @RequestParam("imageFile") MultipartFile imageFile,
                         @AuthenticationPrincipal CustomUserDetails userDetails) {

        if (imageFile.isEmpty()) {
            bindingResult.rejectValue("image", "NotNull", "An image is required for new news.");
        } else {
            ImageDto uploaded = imageService.uploadImage(imageFile);
            newsDto.setImage(uploaded);
        }

        validator.validate(newsDto, bindingResult);

        if (bindingResult.hasErrors()) {
            return "admin/news/form";
        }

        NewsDto savedNews = newsService.save(newsDto);

        var newsEntity = newsRepository.findById(savedNews.getId()).orElseThrow();
        newsEntity.setMember(userDetails.getMember());
        newsRepository.save(newsEntity);

        return "redirect:/admin/news";
    }


    @PostMapping("/save")
    public String save(@ModelAttribute("news") NewsDto dto,
                       BindingResult result,
                       @RequestParam(value = "imageFile", required = false) org.springframework.web.multipart.MultipartFile imageFile) {
        if (imageFile != null && !imageFile.isEmpty()) {
            ImageDto uploaded = imageService.uploadImage(imageFile);
            dto.setImage(uploaded);
        }
        if (result.hasErrors()) return "admin/news/form";
        if (dto.getId() == null) {
            newsService.save(dto);
        } else {
            newsService.update(dto);
        }
        return "redirect:/admin/news";
    }

    @GetMapping("/{id}/edit")
    public String editForm(@PathVariable UUID id, Model model) {
        model.addAttribute("news", newsService.findById(id));
        return "admin/news/form";
    }


    @PostMapping("/{id}")
    public String update(@PathVariable UUID id,
                         @ModelAttribute("news") NewsDto newsDto,
                         BindingResult bindingResult,
                         @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) {

        newsDto.setId(id);

        if (imageFile != null && !imageFile.isEmpty()) {
            ImageDto uploaded = imageService.uploadImage(imageFile);
            newsDto.setImage(uploaded);
        } else {
            NewsDto existingNews = newsService.findById(id);
            newsDto.setImage(existingNews.getImage());
        }

        validator.validate(newsDto, bindingResult);

        if (bindingResult.hasErrors()) {
            return "admin/news/form";
        }

        newsService.update(newsDto);
        return "redirect:/admin/news";
    }


    @DeleteMapping("/{id}")
    public String delete(@PathVariable UUID id) {
        newsService.delete(id);
        return "redirect:/admin/news";
    }

    @GetMapping("/{id}")
    public String viewNews(@PathVariable UUID id, Model model) {
        var newsEntity = newsRepository.findById(id).orElseThrow();
        model.addAttribute("news", newsEntity);
        return "admin/news/details";
    }

}


