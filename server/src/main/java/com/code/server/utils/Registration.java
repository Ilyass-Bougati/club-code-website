package com.code.server.utils;

public class Registration {
    private static Boolean registrationOpen = false;

    public static Boolean getRegistrationOpen() {
        return registrationOpen;
    }

    public static void setRegistrationOpen(Boolean registrationOpen) {
        Registration.registrationOpen = registrationOpen;
    }
}
