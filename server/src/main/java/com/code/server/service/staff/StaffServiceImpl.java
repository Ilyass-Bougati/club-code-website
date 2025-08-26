package com.code.server.service.staff;

import com.code.server.dto.staff.StaffDto;
import com.code.server.dto.staff.StaffMapper;
import com.code.server.dto.staff.StaffRegisterRequest;
import com.code.server.entity.Staff;
import com.code.server.exception.NotFoundException;
import com.code.server.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService {

    private final StaffRepository staffRepository;
    private final StaffMapper staffMapper;
    private final PasswordEncoder passwordEncoder;

    /**
     * This method isn't meant to be used, the creation of staff
     * doesn't take a DTO object, you should use the `register` method
     * @param staffDto
     * @return
     */
    @Deprecated(forRemoval = false)
    @Override
    public StaffDto save(StaffDto staffDto) {
        return null;
    }

    @Override
    public StaffDto update(StaffDto staffDto) {
        Staff staff = staffRepository.findById(staffDto.getId())
                .orElseThrow(() -> new NotFoundException("Staff member not found"));

        staff.setEmail(staffDto.getEmail());
        staff.setRole(staffDto.getRole());

        return staffMapper.toDTO(staffRepository.save(staff));
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

    @Override
    public StaffDto register(StaffRegisterRequest request) {
        // Creating the staff entity
        Staff staff = Staff.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        return staffMapper.toDTO(staffRepository.save(staff));
    }
}
