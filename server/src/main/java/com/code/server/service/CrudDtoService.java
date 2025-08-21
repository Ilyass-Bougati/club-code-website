package com.code.server.service;

public interface CrudDtoService <ID, DTO>{
    DTO save(DTO dto);
    DTO update(DTO dto);
    void delete(ID id);
    DTO findById(ID id);
}
