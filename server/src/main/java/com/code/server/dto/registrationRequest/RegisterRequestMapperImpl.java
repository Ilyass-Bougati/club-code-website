package com.code.server.dto.registrationRequest;

import com.code.server.dto.areaOfInterest.AreaOfInterestMapper;
import com.code.server.entity.RegistrationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RegisterRequestMapperImpl implements RegistrationRequestMapper {

    private final AreaOfInterestMapper areaOfInterestMapper;

    @Override
    public RegistrationRequestDto toDTO(RegistrationRequest registrationRequest) {
        return RegistrationRequestDto.builder()
                .firstName(registrationRequest.getFirstName())
                .lastName(registrationRequest.getLastName())
                .email(registrationRequest.getEmail())
                .year(registrationRequest.getYear())
                .areaOfInterests(registrationRequest.getAreaOfInterests().stream().map(areaOfInterestMapper::toDTO).toList())
                .major(registrationRequest.getMajor())
                .build();
    }

    @Override
    public RegistrationRequest toEntity(RegistrationRequestDto registrationRequestDto) {
        return RegistrationRequest.builder()
                .firstName(registrationRequestDto.getFirstName())
                .lastName(registrationRequestDto.getLastName())
                .email(registrationRequestDto.getEmail())
                .year(registrationRequestDto.getYear())
                .areaOfInterests(registrationRequestDto.getAreaOfInterests().stream().map(areaOfInterestMapper::toEntity).collect(Collectors.toSet()))
                .major(registrationRequestDto.getMajor())
                .build();
    }
}
