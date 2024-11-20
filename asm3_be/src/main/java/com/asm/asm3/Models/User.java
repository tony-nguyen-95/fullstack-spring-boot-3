package com.asm.asm3.Models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    private String address;
    private String dateOfBirth;

    @Column(nullable = false, unique = true)
    private String email;

    private Boolean gender; // Use Boolean instead of BIT(1)
    private byte[] imageData; // Use byte[] for image data
    private String imagePath;
    private Boolean isDelete; // Use Boolean instead of BIT(1)
    private String name;
    private String password;
    private String phone;

    @Enumerated(EnumType.STRING)
    private UserRole role;

}
