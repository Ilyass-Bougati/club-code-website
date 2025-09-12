package com.code.server.config;

import com.code.server.entity.Member;
import com.code.server.enums.UserRole;
import com.code.server.repository.MemberRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final MemberRepository memberRepository;
    private final RequestCache requestCache = new HttpSessionRequestCache();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        String email = authentication.getName();

        try {
            Member member = memberRepository.findByEmail(email).orElse(null);
            String targetUrl = determineTargetUrl(request, member);

            requestCache.removeRequest(request, response);

            response.sendRedirect(targetUrl);

        } catch (Exception e) {
            response.sendRedirect("/admin/login?error=system_error");
        }
    }

    private String determineTargetUrl(HttpServletRequest request, Member member) {
        if (member == null) {
            return "/admin/login?error=user_not_found";
        }

        UserRole userRole = member.getRole();

        if (userRole == UserRole.USER) {
            return "/admin/login?error=access_denied&message=Admin access required";
        }

        if (userRole == UserRole.STAFF) {
            return "/admin/members/pending";
        }

        if (userRole == UserRole.ADMIN || userRole == UserRole.SUPER_ADMIN) {
            SavedRequest savedRequest = requestCache.getRequest(request, null);
            if (savedRequest != null) {
                String redirectUrl = savedRequest.getRedirectUrl();
                if (redirectUrl != null && redirectUrl.startsWith("/admin")) {
                    return redirectUrl;
                }
            }
            return "/admin/dashboard";
        }

        // For any other unknown roles
        return "/admin/login?error=invalid_role";
    }
}