package com.code.server.dto.staff;

import com.code.server.entity.Staff;

public class StaffMapperImpl implements StaffMapper {
    @Override
    public StaffDto toDTO(Staff staff) {
        return StaffDto.builder()
                .email(staff.getEmail())
                .role(staff.getRole())
                .createdAt(staff.getCreatedAt())
                .build();
    }

    // TODO : implement this later
    // make sure to take security into account
    @Override
    public Staff toEntity(StaffDto staffDto) {
        return null;
    }
}
