package com.asm.asm3.DTOs;

import lombok.Data;

@Data
public class UserRegistrationDto {
    private String name;
    private String email;
    private String password;
    private String phone;
}
