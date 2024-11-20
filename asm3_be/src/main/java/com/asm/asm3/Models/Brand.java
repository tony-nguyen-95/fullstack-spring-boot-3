package com.asm.asm3.Models;

public enum Brand {
    ADIDAS("Adidas"),
    NIKE("Nike"),
    PUMA("Puma"),
    REEBOK("Reebok"),
    UNDER_ARMOUR("Under Armour");

    private final String brand;

    Brand(String brand) {
        this.brand = brand;
    }

    public String getBrand() {
        return brand;
    }
}
