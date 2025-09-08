package com.code.server;

import com.code.server.properties.CloudinaryProperties;
import com.code.server.properties.JwtProperties;
import com.code.server.properties.StorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
@EnableConfigurationProperties({
        CloudinaryProperties.class,
        StorageProperties.class,
        JwtProperties.class
})
public class ServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

}
