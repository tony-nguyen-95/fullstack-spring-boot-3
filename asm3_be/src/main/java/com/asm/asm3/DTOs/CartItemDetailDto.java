package com.asm.asm3.DTOs;

public interface CartItemDetailDto {
    Long getCartItemId();

    Integer getQuantity();

    Long getSizeId();

    Long getProductId();

    String getProductName();

    Long getProductPrice();

    int getSize();
}