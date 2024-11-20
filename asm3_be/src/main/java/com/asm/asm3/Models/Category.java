package com.asm.asm3.Models;

public enum Category {
    SHOE("Shoe"),
    ACCESSORIES("Accessories");

    private final String category;

    Category(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }
}
