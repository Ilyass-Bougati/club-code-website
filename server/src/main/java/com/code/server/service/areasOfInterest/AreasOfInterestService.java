package com.code.server.service.areasOfInterest;
import com.code.server.dto.areaOfInterest.AreaOfInterestDto;
import com.code.server.service.CrudDtoService;

import java.util.List;
import java.util.UUID;

public interface AreasOfInterestService extends CrudDtoService<UUID,AreaOfInterestDto> {
    List<AreaOfInterestDto> findAll();
}
