package com.code.server.dto.allowedAdminIp;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddAllowedAdminIpRequest {
    private String ip;
    private String identifier;
}
