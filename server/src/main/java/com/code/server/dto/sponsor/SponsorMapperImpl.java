package com.code.server.dto.sponsor;

import com.code.server.entity.Sponsor;
import org.springframework.stereotype.Service;

@Service
public class SponsorMapperImpl implements SponsorMapper {
    @Override
    public SponsorDto toDTO(Sponsor sponsor) {
        return SponsorDto.builder()
                .id(sponsor.getId())
                .name(sponsor.getName())
                .build();
    }

    @Override
    public Sponsor toEntity(SponsorDto sponsorDto) {
        return Sponsor.builder()
                .id(sponsorDto.getId())
                .name(sponsorDto.getName())
                .build();
    }
}
