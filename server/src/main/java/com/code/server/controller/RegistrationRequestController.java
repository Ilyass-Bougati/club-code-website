package com.code.server.controller;

import com.code.server.dto.registrationRequest.RegistrationRequestDto;
import com.code.server.service.registrationrequest.RegistrationRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/register")
public class RegistrationRequestController {

    private final RegistrationRequestService registrationRequestService;

    @GetMapping("/{id}")
    public ResponseEntity<RegistrationRequestDto> getRegistration(@PathVariable UUID id){
        return ResponseEntity.ok(registrationRequestService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<RegistrationRequestDto>> getAllRegistration(){
        return ResponseEntity.ok(registrationRequestService.findAll());
    }

    @PostMapping
    public ResponseEntity<RegistrationRequestDto> createRegistration(@RequestBody RegistrationRequestDto dto){
        return ResponseEntity.ok(registrationRequestService.save(dto));
    }

    @PutMapping
    public ResponseEntity<RegistrationRequestDto> updateRegistration(@RequestBody RegistrationRequestDto dto){
        return ResponseEntity.ok(registrationRequestService.update(dto));
    }

    @DeleteMapping("/id")
    @ResponseStatus(HttpStatus.OK)
    public void deleteImage(@PathVariable UUID id){
        registrationRequestService.delete(id);
    }
}
