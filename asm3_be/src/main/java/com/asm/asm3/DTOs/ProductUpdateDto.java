package com.asm.asm3.DTOs;

import com.asm.asm3.Models.Brand;
import com.asm.asm3.Models.Category;

import lombok.Data;

@Data
public class ProductUpdateDto {
    private String name;
    private String status;
    private Brand brand;
    private Category category;
    private String description;
    private Long price;
    private int size_38_quantity;
    private int size_39_quantity;
    private int size_40_quantity;
    private int size_41_quantity;
    private int size_42_quantity;
}
