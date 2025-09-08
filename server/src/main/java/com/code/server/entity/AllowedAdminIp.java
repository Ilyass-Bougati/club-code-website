package com.code.server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AllowedAdminIp {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String ip;
    private String identifier;
    @CreationTimestamp
    private LocalDateTime createdAt;
}
