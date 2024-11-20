package com.asm.asm3.Models;

public enum PaymentMethod {
    ATM("ATM"),
    COD("COD");

    private final String method;

    PaymentMethod(String method) {
        this.method = method;
    }

    public String getMethod() {
        return method;
    }
}
