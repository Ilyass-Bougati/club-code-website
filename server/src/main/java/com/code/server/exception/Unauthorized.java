package com.code.server.exception;

public class Unauthorized extends RuntimeException {
    public Unauthorized(String message) {
        super(message);
    }
}
