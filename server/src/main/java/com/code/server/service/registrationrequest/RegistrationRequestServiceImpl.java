package com.code.server.service.registrationrequest;

import com.code.server.dto.areaOfInterest.AreaOfInterestMapper;
import com.code.server.dto.registrationRequest.RegistrationRequestDto;
import com.code.server.dto.registrationRequest.RegistrationRequestMapper;
import com.code.server.entity.AreaOfInterest;
import com.code.server.entity.RegistrationRequest;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.RegistrationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class RegistrationRequestServiceImpl implements RegistrationRequestService {

    RegistrationRequestRepository repository;
    RegistrationRequestMapper mapper;
    AreaOfInterestMapper AOIMapper;
    @Override
    public RegistrationRequestDto save(RegistrationRequestDto registrationRequestDto) {
        registrationRequestDto.setId(null);
        RegistrationRequest registrationRequest = mapper.toEntity(registrationRequestDto);
        RegistrationRequest saved = repository.save(registrationRequest);
        return mapper.toDTO(saved);
    }

    @Override
    public RegistrationRequestDto update(RegistrationRequestDto registrationRequestDto) {
        RegistrationRequest registrationRequest = repository.findById(registrationRequestDto.getId())
                .orElseThrow(()->new NotFoundException("registration doesn't exist"));
        registrationRequest.setEmail(registrationRequestDto.getEmail());
        registrationRequest.setId(registrationRequestDto.getId());
        registrationRequest.setMajor(registrationRequestDto.getMajor());
        registrationRequest.setLastName(registrationRequestDto.getLastName());
        registrationRequest.setFirstName(registrationRequestDto.getFirstName());
        registrationRequest.setYear(registrationRequestDto.getYear());
        Set<AreaOfInterest> interests = registrationRequestDto.getAreaOfInterests()
                .stream()
                .map(AOIMapper::toEntity)
                .collect(Collectors.toSet());
        registrationRequest.setAreaOfInterests(interests);

        return mapper.toDTO(repository.save(registrationRequest));
    }

    @Override
    public void delete(UUID uuid) {
        repository.deleteById(uuid);
    }

    @Override
    public RegistrationRequestDto findById(UUID uuid) {

         return mapper.toDTO(repository.findById(uuid).
                 orElseThrow(()-> new NotFoundException("registration doesn't exist")));

    }

    @Override
    public List<RegistrationRequestDto> findAll() {
        return repository.findAll()
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
}

