package com.code.server.dto.event;

import com.code.server.dto.areaOfInterest.AreaOfInterestDto;
import com.code.server.dto.event.AdminEventDto;
import com.code.server.dto.image.ImageDto;
import com.code.server.dto.member.MemberDto;
import com.code.server.dto.sponsor.SponsorDto;
import com.code.server.enums.EventType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminEventDto {
    private UUID id;

    @NotBlank(message = "Event title is required")
    private String title;

    @NotBlank(message = "Event description is required")
    private String description;

    @NotNull(message = "Event type is required")
    private EventType eventType;

    private ImageDto image;

    @Builder.Default
    private List<AreaOfInterestDto> areaOfInterests = new ArrayList<>();

    @Builder.Default
    private List<SponsorDto> sponsors = new ArrayList<>();

    private MemberDto member;

    @Builder.Default
    private List<MemberDto> members = new ArrayList<>();

    @NotNull(message = "Sponsored status is required")
    @Builder.Default
    private Boolean sponsored = false;

    @NotNull(message = "Registration open status is required")
    @Builder.Default
    private Boolean registrationOpen = false;

    private LocalDateTime registrationDeadline;

    private LocalDateTime publishedAt;

    @NotNull(message = "Published status is required")
    @Builder.Default
    private Boolean published = true;

    // Helper methods for form handling
    public List<UUID> getAreaOfInterestIds() {
        if (areaOfInterests == null) return new ArrayList<>();
        return areaOfInterests.stream()
                .map(AreaOfInterestDto::getId)
                .toList();
    }

    public List<UUID> getSponsorIds() {
        if (sponsors == null) return new ArrayList<>();
        return sponsors.stream()
                .map(SponsorDto::getId)
                .toList();
    }

    public List<UUID> getMemberIds() {
        if (members == null) return new ArrayList<>();
        return members.stream()
                .map(MemberDto::getId)
                .toList();
    }

    public void setAreaOfInterestIds(List<UUID> ids) {
        if (ids != null) {
            this.areaOfInterests = ids.stream()
                    .map(id -> AreaOfInterestDto.builder().id(id).build())
                    .toList();
        }
    }

    public void setSponsorIds(List<UUID> ids) {
        if (ids != null) {
            this.sponsors = ids.stream()
                    .map(id -> SponsorDto.builder().id(id).build())
                    .toList();
        }
    }

    public void setMemberIds(List<UUID> ids) {
        if (ids != null) {
            this.members = ids.stream()
                    .map(id -> MemberDto.builder().id(id).build())
                    .toList();
        }
    }
}
