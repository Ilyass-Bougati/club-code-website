package com.code.server.dto.areaOfInterest;

import com.code.server.entity.AreaOfInterest;
import org.springframework.stereotype.Service;

@Service
public class AreaOfInterestMapperImpl implements AreaOfInterestMapper {
    @Override
    public AreaOfInterestDto toDTO(AreaOfInterest areaOfInterest) {
        return AreaOfInterestDto.builder()
                .id(areaOfInterest.getId())
                .name(areaOfInterest.getName())
                .build();
    }

    @Override
    public AreaOfInterest toEntity(AreaOfInterestDto areaOfInterestDto) {
        // TODO : Finish this when the services are implemented
        return AreaOfInterest.builder()
                .id(areaOfInterestDto.getId())
                .name(areaOfInterestDto.getName())
                .build();
    }
}
