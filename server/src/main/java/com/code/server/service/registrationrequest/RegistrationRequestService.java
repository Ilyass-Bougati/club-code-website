package com.code.server.service.registrationrequest;

import com.code.server.dto.registrationRequest.RegistrationRequestDto;
import com.code.server.service.CrudDtoService;

import java.util.List;
import java.util.UUID;

public interface RegistrationRequestService extends CrudDtoService<UUID, RegistrationRequestDto> {

    public List<RegistrationRequestDto> findAll();
}
