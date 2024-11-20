package com.asm.asm3.DTOs;

import com.asm.asm3.Models.Brand;
import com.asm.asm3.Models.Category;

import lombok.Data;

@Data
public class ProductDetailDto {
    private Long id;
    private String name;
    private String status;
    private Brand brand;
    private Category category;
    private String description;
    private Long price;
    private String imagePath;

    private int size_38_quantity;
    private Long size_38_id;

    private int size_39_quantity;
    private Long size_39_id;

    private int size_40_quantity;
    private Long size_40_id;

    private int size_41_quantity;
    private Long size_41_id;

    private int size_42_quantity;
    private Long size_42_id;

}
