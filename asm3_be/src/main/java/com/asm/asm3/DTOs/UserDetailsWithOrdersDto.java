package com.asm.asm3.DTOs;

import com.asm.asm3.Models.Order;
import lombok.Data;

import java.util.List;

@Data
public class UserDetailsWithOrdersDto {
    private Long userId;
    private String name;
    private String email;
    private String phone;
    private List<Order> orders;
}