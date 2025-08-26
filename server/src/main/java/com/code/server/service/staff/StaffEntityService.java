package com.code.server.service.staff;

import com.code.server.entity.Staff;
import com.code.server.service.CrudEntityService;

import java.util.UUID;

public interface StaffEntityService extends CrudEntityService<Staff, UUID> {
    Staff findByEmail(String email);
}
