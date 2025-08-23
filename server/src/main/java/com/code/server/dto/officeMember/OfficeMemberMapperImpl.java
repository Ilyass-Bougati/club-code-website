package com.code.server.dto.officeMember;

import com.code.server.dto.image.ImageMapper;
import com.code.server.entity.OfficeMember;
import com.code.server.service.Image.ImageEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OfficeMemberMapperImpl implements OfficeMemberMapper {

    private final ImageMapper imageMapper;
    private final ImageEntityService imageEntityService;

    @Override
    public OfficeMemberDto toDTO(OfficeMember officeMember) {
        return OfficeMemberDto.builder()
                .id(officeMember.getId())
                .image(imageMapper.toDTO(officeMember.getImage()))
                .firstName(officeMember.getFirstName())
                .lastName(officeMember.getLastName())
                .position(officeMember.getPosition())
                .linkedin(officeMember.getLinkedin())
                .instagram(officeMember.getInstagram())
                .addedAt(officeMember.getAddedAt())
                .build();
    }

    @Override
    public OfficeMember toEntity(OfficeMemberDto officeMemberDto) {
        return OfficeMember.builder()
                .image(imageEntityService.findById(officeMemberDto.getImage().getId()))
                .firstName(officeMemberDto.getFirstName())
                .lastName(officeMemberDto.getLastName())
                .position(officeMemberDto.getPosition())
                .linkedin(officeMemberDto.getLinkedin())
                .instagram(officeMemberDto.getInstagram())
                .addedAt(officeMemberDto.getAddedAt())
                .build();
    }
}
