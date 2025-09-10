package com.code.server.service.officeMember;

import com.code.server.dto.officeMember.OfficeMemberDto;
import com.code.server.dto.officeMember.OfficeMemberMapper;
import com.code.server.entity.Image;
import com.code.server.entity.OfficeMember;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.ImageRepository;
import com.code.server.repository.OfficeMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class OfficeMemberServiceImp implements OfficeMemberService{

    private final OfficeMemberRepository officeMemberRepository;
    private final OfficeMemberMapper officeMemberMapper;
    private final ImageRepository imageRepository;

    @Override
    @Caching(evict = {
            @CacheEvict(value = "allOfficeMemberCache", key = "'ALL_OFFICE_MEMBERS'")
    }, put = {
            @CachePut(value = "officeMemberCache", key = "#result.id"),
    })
    public OfficeMemberDto save(OfficeMemberDto officeMemberDto) {
        officeMemberDto.setId(null);
        return officeMemberMapper.toDTO(officeMemberRepository.save(officeMemberMapper.toEntity(officeMemberDto)));
    }

    @Override
    @Caching(evict = {
            @CacheEvict(value = "allOfficeMemberCache", key = "'ALL_OFFICE_MEMBERS'")
    }, put = {
            @CachePut(value = "officeMemberCache", key = "#officeMemberDto.id"),
    })
    public OfficeMemberDto update(OfficeMemberDto officeMemberDto) {
        OfficeMember officeMember=officeMemberRepository.findById(officeMemberDto.getId())
              .orElseThrow(() -> new NotFoundException("Member doesn't exist"));
        if(officeMemberDto.getFirstName() != null)
        officeMember.setFirstName(officeMemberDto.getFirstName());

        if(officeMemberDto.getLastName() != null)
        officeMember.setLastName(officeMemberDto.getLastName());

        if(officeMemberDto.getInstagram() != null)
        officeMember.setInstagram(officeMemberDto.getInstagram());

        if(officeMemberDto.getLinkedin() != null)
        officeMember.setLinkedin(officeMemberDto.getLinkedin());

        if(officeMemberDto.getPosition() != null)
        officeMember.setPosition(officeMemberDto.getPosition());

        if (officeMemberDto.getImage() != null) {
            Image image = imageRepository.findById(officeMemberDto.getImage().getId())
                    .orElseThrow(() -> new NotFoundException("Image not found"));
            officeMember.setImage(image);
        }
        OfficeMember saved=officeMemberRepository.save(officeMember);
        return officeMemberMapper.toDTO(saved);
    }

    @Override
    @Caching(evict = {
            @CacheEvict(value = "officeMemberCache", key = "#uuid"),
            @CacheEvict(value = "allOfficeMemberCache", key = "'ALL_OFFICE_MEMBERS'")
    })
    public void delete(UUID uuid) {
        officeMemberRepository.findById(uuid)
                .orElseThrow(()->new NotFoundException("member not found"));
        officeMemberRepository.deleteById(uuid);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "officeMemberCache", key = "#uuid")
    public OfficeMemberDto findById(UUID uuid) {
        OfficeMember officeMember = officeMemberRepository.findById(uuid)
                .orElseThrow(()->new NotFoundException("member not found"));
        return officeMemberMapper.toDTO(officeMember);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "allOfficeMemberCache", key = "'ALL_OFFICE_MEMBERS'")
    public List<OfficeMemberDto> findAll() {
        return officeMemberRepository.findAll()
                .stream()
                .map(officeMemberMapper::toDTO)
                .collect(Collectors.toList());
    }
}
