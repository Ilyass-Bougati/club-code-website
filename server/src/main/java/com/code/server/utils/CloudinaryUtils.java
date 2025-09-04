package com.code.server.utils;

public class CloudinaryUtils {
    public static String extractPublicId(String url) {
        // Example: https://res.cloudinary.com/demo/image/upload/v1620000000/myfolder/picture.png
        String[] parts = url.split("/upload/");
        if (parts.length < 2) {
            throw new RuntimeException("Invalid URL: " + url);
        }

        String afterUpload = parts[1];

        // Remove version prefix if present
        afterUpload = afterUpload.replaceFirst("^v[0-9]+/", "");

        // Remove file extension
        int dotIndex = afterUpload.lastIndexOf(".");
        if (dotIndex != -1) {
            afterUpload = afterUpload.substring(0, dotIndex);
        }

        return afterUpload;
    }
}
