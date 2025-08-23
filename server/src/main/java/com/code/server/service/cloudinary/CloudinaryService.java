package com.code.server.service.cloudinary;

import java.io.File;
import java.util.Map;
import java.util.UUID;

public interface CloudinaryService {
    Map<String, Object> upload(File file);
    void delete(String uri);
}
