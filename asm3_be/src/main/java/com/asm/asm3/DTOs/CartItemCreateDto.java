package com.asm.asm3.DTOs;

import lombok.Data;

@Data
public class CartItemCreateDto {
    private Integer quantity;
    private Long sizeId;
}