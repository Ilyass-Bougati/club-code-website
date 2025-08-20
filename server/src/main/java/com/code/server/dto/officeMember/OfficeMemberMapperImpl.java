package com.code.server.dto.officeMember;

import com.code.server.dto.image.ImageMapper;
import com.code.server.entity.OfficeMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OfficeMemberMapperImpl implements OfficeMemberMapper {

    private final ImageMapper imageMapper;

    @Override
    public OfficeMemberDto toDTO(OfficeMember officeMember) {
        return OfficeMemberDto.builder()
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
                .image(imageMapper.toEntity(officeMemberDto.getImage()))
                .firstName(officeMemberDto.getFirstName())
                .lastName(officeMemberDto.getLastName())
                .position(officeMemberDto.getPosition())
                .linkedin(officeMemberDto.getLinkedin())
                .instagram(officeMemberDto.getInstagram())
                .addedAt(officeMemberDto.getAddedAt())
                .build();
    }
}
