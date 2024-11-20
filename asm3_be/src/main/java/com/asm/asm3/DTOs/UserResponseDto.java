package com.asm.asm3.DTOs;

import com.asm.asm3.Models.UserRole;

import lombok.Data;

@Data
public class UserResponseDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private UserRole role;

    public UserResponseDto(Long id, String name, String email, String phone, UserRole role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
    }
}
