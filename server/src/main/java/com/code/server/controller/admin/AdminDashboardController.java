package com.code.server.controller.admin;

import com.code.server.dto.event.EventDto;
import com.code.server.dto.news.NewsDto;
import com.code.server.service.event.EventService;
import com.code.server.service.news.NewsService;
import com.code.server.service.officeMember.OfficeMemberService;
import com.code.server.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final OfficeMemberService officeMemberService;
    private final MemberRepository memberRepository;
    private final NewsService newsService;
    private final EventService eventService;

    @GetMapping({"", "/", "/dashboard"})
    public String dashboard(Model model) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = "Admin";
        
        if (authentication != null && authentication.isAuthenticated() && 
            !"anonymousUser".equals(authentication.getName())) {
            currentUserName = authentication.getName();
        }
        
        int totalOfficeMembers = officeMemberService.findAll().size();
        int totalRegularMembers = memberRepository.findAll().size();
        int totalMembers = totalOfficeMembers + totalRegularMembers;
        
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

        List<Map<String, Object>> recentEvents = eventService.findAll().stream()
                .filter(e -> e.getPublishedAt() != null)
                .sorted(Comparator.comparing(EventDto::getPublishedAt).reversed())
                .limit(5)
                .map(e -> Map.<String, Object>of(
                        "id", e.getId(),
                        "title", e.getTitle(),
                        "description", e.getDescription(),
                        "eventDate", e.getPublishedAt()
                ))
                .collect(Collectors.toList());

        model.addAttribute("currentUserName", currentUserName);
        model.addAttribute("totalMembers", totalMembers);
        model.addAttribute("totalNews", totalNews);
        model.addAttribute("totalEvents", totalEvents);
        model.addAttribute("recentNews", recentNews);
        model.addAttribute("recentEvents", recentEvents);

        return "admin/dashboard";
    }

    @GetMapping("/export")
    @ResponseBody
    public ResponseEntity<String> exportDashboardData() {
        StringBuilder csv = new StringBuilder();
        
        csv.append("Metric,Value\n");
        
        csv.append("Total Members,").append(memberRepository.findAll().size() + officeMemberService.findAll().size()).append("\n");
        csv.append("Total News,").append(newsService.getAllNews().size()).append("\n");
        csv.append("Total Events,").append(eventService.findAll().size()).append("\n");
        csv.append("Export Date,").append(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))).append("\n");
        
        String filename = "dashboard-export-" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) + ".csv";
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csv.toString());
    }
}


