package com.code.server.dto.staff;

import com.code.server.entity.Staff;
import org.springframework.stereotype.Service;

@Service
public class StaffMapperImpl implements StaffMapper {
    @Override
    public StaffDto toDTO(Staff staff) {
        return StaffDto.builder()
                .email(staff.getEmail())
                .role(staff.getRole())
                .createdAt(staff.getCreatedAt())
                .build();
    }


    @Override
    public Staff toEntity(StaffDto staffDto) {
        return Staff.builder()
                .email(staffDto.getEmail())
                .role(staffDto.getRole())
                // hash the password then save it
                .build();
    }
}
