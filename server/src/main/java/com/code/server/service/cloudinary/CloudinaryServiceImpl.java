package com.code.server.service.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.code.server.properties.CloudinaryProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryServiceImpl(CloudinaryProperties cloudinaryProperties) {
        this.cloudinary = new Cloudinary(cloudinaryProperties.url());
    }

    @Override
    @SuppressWarnings("unchecked")
    public Map<String, Object> upload(File file) {
        try {
            return cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    // TODO : implement this later
    @Override
    public void delete(Long id) {

    }
}
