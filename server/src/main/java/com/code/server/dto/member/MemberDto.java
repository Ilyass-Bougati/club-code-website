package com.code.server.dto.member;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {
    private UUID id;

    @Email(message = "Member's email must follow the correct email format")
    @NotBlank(message = "Member's email can't be empty or null")
    private String email;

    @NotBlank(message = "Member's firstname can't be empty or null")
    private String firstName;

    @NotBlank(message = "Member's lastname can't be empty or null")
    private String lastName;

    @NotBlank(message = "Member's phone number can't be empty or null")
    private String phoneNumber;

    private Boolean activated;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
