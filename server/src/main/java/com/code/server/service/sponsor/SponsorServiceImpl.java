package com.code.server.service.sponsor;

import com.code.server.dto.sponsor.SponsorDto;
import com.code.server.dto.sponsor.SponsorMapper;
import com.code.server.dto.sponsor.SponsorMapperImpl;
import com.code.server.entity.News;
import com.code.server.entity.Sponsor;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.ServiceRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
@Transactional
public class SponsorServiceImpl implements SponsorService {

    ServiceRepository serviceRepository;
    SponsorMapperImpl sponsorMapper;
    @Override
    public SponsorDto save(SponsorDto sponsorDto) {
        sponsorDto.setId(null);
        Sponsor sponsor = sponsorMapper.toEntity(sponsorDto);
        Sponsor saved = serviceRepository.save(sponsor);
        return sponsorMapper.toDTO(saved);
    }

    @Override
    public SponsorDto update(SponsorDto sponsorDto) {
        Sponsor sponsor= serviceRepository.findById(sponsorDto.getId())
                .orElseThrow(() -> new NotFoundException("Sponsor doesn't exist"));
        sponsor.setName(sponsorDto.getName());
        return sponsorMapper.toDTO(serviceRepository.save(sponsor));
    }

    @Override
    public void delete(UUID uuid) {
        serviceRepository.findById(uuid)
                .orElseThrow(() -> new NotFoundException("Sponsor not found with UUID: " + uuid));
        serviceRepository.deleteById(uuid);
    }

    @Override
    public SponsorDto findById(UUID uuid) {
        Sponsor sponsor = serviceRepository.findById(uuid)
                .orElseThrow(()-> new NotFoundException("Sponsor not found with UUID: " + uuid));
        return sponsorMapper.toDTO(sponsor);
    }
}
