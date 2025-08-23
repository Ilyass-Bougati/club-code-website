package com.code.server.service.areasOfInterest;

import com.code.server.dto.areaOfInterest.AreaOfInterestDto;
import com.code.server.dto.areaOfInterest.AreaOfInterestMapper;
import com.code.server.entity.AreaOfInterest;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.AreasOfInterestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AreasOfInterestServiceImp implements AreasOfInterestService{

    private final AreasOfInterestRepository areasOfInterestRepository;
    private final AreaOfInterestMapper areaOfInterestMapper;

    @Override
    public AreaOfInterestDto save(AreaOfInterestDto areaOfInterestDto) {
     areaOfInterestDto.setId(null);
     return areaOfInterestMapper.toDTO(
             areasOfInterestRepository.save(areaOfInterestMapper.toEntity(areaOfInterestDto))
     );
    }

    @Override
    public AreaOfInterestDto update(AreaOfInterestDto areaOfInterestDto) {
        AreaOfInterest areaOfInterest=areasOfInterestRepository.findById(areaOfInterestDto.getId())
                .orElseThrow(()-> new NotFoundException("Area not found"));
        areaOfInterest.setName(areaOfInterestDto.getName());
       // areaOfInterest.setRegistrationRequests();
      //  areaOfInterest.setEvents();
        AreaOfInterest saved=areasOfInterestRepository.save(areaOfInterest);
        return areaOfInterestMapper.toDTO(saved);
    }

    @Override
    public void delete(UUID uuid) {
        areasOfInterestRepository.findById(uuid).orElseThrow(()->new NotFoundException("area of interest not found"));
        areasOfInterestRepository.deleteById(uuid);
    }

    @Override
    @Transactional(readOnly = true)
    public AreaOfInterestDto findById(UUID uuid) {
     return areasOfInterestRepository.findById(uuid).map(areaOfInterestMapper::toDTO)
              .orElseThrow(() -> new NotFoundException("area of interest not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AreaOfInterestDto> findAll() {
        return areasOfInterestRepository.findAll()
                .stream()
                .map(areaOfInterestMapper::toDTO)
                .collect(Collectors.toList());
    }
}
