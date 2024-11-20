package com.asm.asm3.DTOs;

import lombok.Data;

@Data
public class CommentCreateDto {
    private Long productId;
    private Long userId;
    private String text;
    private Integer rate;
}
