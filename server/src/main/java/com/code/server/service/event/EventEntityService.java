package com.code.server.service.event;

import com.code.server.entity.Event;
import com.code.server.service.CrudEntityService;

import java.util.UUID;

public interface EventEntityService extends CrudEntityService<Event, UUID> {
}
