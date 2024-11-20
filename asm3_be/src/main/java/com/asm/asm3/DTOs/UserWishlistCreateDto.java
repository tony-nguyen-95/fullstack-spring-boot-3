package com.asm.asm3.DTOs;

import lombok.Data;

@Data
public class UserWishlistCreateDto {
    private Long customerId;
    private Long productId;
}
