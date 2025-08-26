package com.code.server.service.member;

import com.code.server.entity.Member;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberEntityServiceImpl implements MemberEntityService {

    private final StaffRepository staffRepository;

    @Override
    @Transactional(readOnly = true)
    public Member findById(UUID uuid) {
        return staffRepository.findById(uuid)
                .orElseThrow(() -> new NotFoundException("Staff not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public Member findByEmail(String email) {
        return staffRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Staff not found"));
    }
}
