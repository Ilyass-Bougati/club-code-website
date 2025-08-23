package com.code.server.controller;

import com.code.server.dto.areaOfInterest.AreaOfInterestDto;
import com.code.server.dto.event.EventDto;
import com.code.server.service.areasOfInterest.AreasOfInterestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/area")
@RequiredArgsConstructor
public class AreaController {
     private final AreasOfInterestService areasOfInterestService;
    @PostMapping("/add")
    public ResponseEntity<AreaOfInterestDto> add(@RequestBody AreaOfInterestDto areaOfInterestDto){
        return ResponseEntity.ok(areasOfInterestService.save(areaOfInterestDto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id){
        areasOfInterestService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<AreaOfInterestDto> update(@PathVariable UUID id,@RequestBody  AreaOfInterestDto areaOfInterestDto){
        areaOfInterestDto.setId(id);
        return ResponseEntity.ok(areasOfInterestService.update(areaOfInterestDto));
    }
    @GetMapping("/all")
    public ResponseEntity<List<AreaOfInterestDto>> getAll(){
        return ResponseEntity.ok(areasOfInterestService.findAll());
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<AreaOfInterestDto> get(@PathVariable UUID id){
        return ResponseEntity.ok(areasOfInterestService.findById(id));
    }
}
