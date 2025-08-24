package com.code.server.service.sponsor;

import com.code.server.dto.sponsor.SponsorDto;
import com.code.server.dto.sponsor.SponsorMapperImpl;
import com.code.server.entity.Sponsor;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.SponsorRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@AllArgsConstructor
@Transactional
public class SponsorServiceImpl implements SponsorService {

    SponsorRepository sponsorRepository;
    SponsorMapperImpl sponsorMapper;

    @Override
    public SponsorDto save(SponsorDto sponsorDto) {
        sponsorDto.setId(null);
        Sponsor sponsor = sponsorMapper.toEntity(sponsorDto);
        Sponsor saved = sponsorRepository.save(sponsor);
        return sponsorMapper.toDTO(saved);
    }

    @Override
    public SponsorDto update(SponsorDto sponsorDto) {
        Sponsor sponsor= sponsorRepository.findById(sponsorDto.getId())
                .orElseThrow(() -> new NotFoundException("Sponsor doesn't exist"));
        sponsor.setName(sponsorDto.getName());
        return sponsorMapper.toDTO(sponsorRepository.save(sponsor));
    }

    @Override
    public void delete(UUID uuid) {
        sponsorRepository.findById(uuid)
                .orElseThrow(() -> new NotFoundException("Sponsor not found with UUID: " + uuid));
        sponsorRepository.deleteById(uuid);
    }

    @Override
    @Transactional(readOnly = true)
    public SponsorDto findById(UUID uuid) {
        Sponsor sponsor = sponsorRepository.findById(uuid)
                .orElseThrow(()-> new NotFoundException("Sponsor not found with UUID: " + uuid));
        return sponsorMapper.toDTO(sponsor);
    }
}
