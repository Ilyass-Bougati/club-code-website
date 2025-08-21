package com.code.server.service.staff;

import com.code.server.dto.staff.StaffDto;
import com.code.server.service.CrudDtoService;

import java.util.UUID;

public interface StaffService extends CrudDtoService<UUID, StaffDto> {
}
