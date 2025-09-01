package com.code.server.controller.admin;

import com.code.server.dto.news.NewsDto;
import com.code.server.service.event.EventService;
import com.code.server.service.news.NewsService;
import com.code.server.service.officeMember.OfficeMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final OfficeMemberService officeMemberService;
    private final NewsService newsService;
    private final EventService eventService;


    @GetMapping({"", "/", "/dashboard"})
    public String dashboard(Model model) {
        int totalMembers = officeMemberService.findAll().size();
        List<NewsDto> allNews = newsService.getAllNews();
        int totalNews = allNews.size();
        int totalEvents = eventService.findAll().size();

        List<Map<String, Object>> recentNews = allNews.stream()
                .sorted(Comparator.comparing(NewsDto::getPublishedAt, Comparator.nullsLast(Comparator.naturalOrder())).reversed())
                .limit(5)
                .map(n -> Map.<String, Object>of(
                        "id", n.getId(),
                        "title", n.getTitle(),
                        "content", n.getDescription(),
                        "createdAt", n.getPublishedAt(),
                        "imageUrl", n.getImage() != null ? n.getImage().getUri() : null
                ))
                .collect(Collectors.toList());

        model.addAttribute("totalMembers", totalMembers);
        model.addAttribute("totalNews", totalNews);
        model.addAttribute("totalEvents", totalEvents);
        model.addAttribute("recentNews", recentNews);
        model.addAttribute("upcomingEvents", List.of());

        return "admin/dashboard";
    }

}


