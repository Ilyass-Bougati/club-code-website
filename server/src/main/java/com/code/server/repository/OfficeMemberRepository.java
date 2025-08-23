package com.code.server.repository;


import com.code.server.entity.OfficeMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;


public interface OfficeMemberRepository extends JpaRepository<OfficeMember, UUID> {

}
