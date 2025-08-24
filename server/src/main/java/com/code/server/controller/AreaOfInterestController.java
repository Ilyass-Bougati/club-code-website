package com.code.server.controller;

import com.code.server.dto.areaOfInterest.AreaOfInterestDto;
import com.code.server.service.areasOfInterest.AreasOfInterestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/areaOfInterest")
@RequiredArgsConstructor
public class AreaOfInterestController {

     private final AreasOfInterestService areasOfInterestService;

    @PostMapping
    public ResponseEntity<AreaOfInterestDto> add(@RequestBody AreaOfInterestDto areaOfInterestDto){
        return ResponseEntity.ok(areasOfInterestService.save(areaOfInterestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id){
        areasOfInterestService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<AreaOfInterestDto> update(@RequestBody AreaOfInterestDto areaOfInterestDto){
        return ResponseEntity.ok(areasOfInterestService.update(areaOfInterestDto));
    }

    @GetMapping("")
    public ResponseEntity<List<AreaOfInterestDto>> getAll(){
        return ResponseEntity.ok(areasOfInterestService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AreaOfInterestDto> get(@PathVariable UUID id){
        return ResponseEntity.ok(areasOfInterestService.findById(id));
    }
}
