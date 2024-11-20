package com.asm.asm3.Models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "product")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(length = 500)
    private String description;

    @Column(name = "is_delete", nullable = false)
    private Boolean isDelete = false;

    @Column(length = 100)
    private String name;

    private Long price;

    @Column(length = 50)
    private String status;

    @Enumerated(EnumType.STRING)
    private Brand brand;

    @Column(name = "category")
    private Category category;

    @Column(length = 100, name = "image_path")
    private String imagePath;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductSize> productSizes;
}
