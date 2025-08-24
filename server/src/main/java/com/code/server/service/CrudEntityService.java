package com.code.server.service;

public interface CrudEntityService <ENTITY, ID> {
    ENTITY findById(ID id);
}
