package com.code.server.controller;

import com.code.server.dto.officeMember.OfficeMemberDto;
import com.code.server.service.officeMember.OfficeMemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/office")
@RequiredArgsConstructor
public class OfficeMemberController {

    private final OfficeMemberService officeMemberService;

    @PostMapping
    public ResponseEntity<OfficeMemberDto> addMember(@RequestBody @Valid OfficeMemberDto officeMemberDto){
        return ResponseEntity.ok(officeMemberService.save(officeMemberDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable UUID id){
      officeMemberService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<OfficeMemberDto> updateMember(@PathVariable UUID id, @RequestBody @Valid OfficeMemberDto officeMemberDto){
        officeMemberDto.setId(id);
        return ResponseEntity.ok(officeMemberService.update(officeMemberDto));
    }

    @GetMapping
    public ResponseEntity<List<OfficeMemberDto>> getAllMembers(){
        return ResponseEntity.ok(officeMemberService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OfficeMemberDto> getMember(@PathVariable UUID id){
        return ResponseEntity.ok(officeMemberService.findById(id));
    }
}
