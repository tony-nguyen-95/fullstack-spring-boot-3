package com.asm.asm3.Repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.asm.asm3.Models.ProductSize;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize, Long> {
}
