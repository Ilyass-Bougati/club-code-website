package com.code.server.service.staff;

import com.code.server.dto.staff.StaffDto;
import com.code.server.dto.staff.StaffMapper;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService {

    private final StaffRepository staffRepository;
    private final StaffMapper staffMapper;

    @Override
    public StaffDto save(StaffDto staffDto) {
        return null;
    }

    @Override
    public StaffDto update(StaffDto staffDto) {
        return null;
    }

    @Override
    public void delete(UUID id) {
        staffRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public StaffDto findById(UUID id) {
        return staffRepository.findById(id)
                .map(staffMapper::toDTO)
                .orElseThrow(() -> new NotFoundException("Staff member not found"));
    }
}
