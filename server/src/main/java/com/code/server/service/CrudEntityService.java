package com.code.server.service;

import jakarta.validation.constraints.NotNull;

public interface CrudEntityService <ENTITY, ID> {
    ENTITY findById(@NotNull ID id);
}
