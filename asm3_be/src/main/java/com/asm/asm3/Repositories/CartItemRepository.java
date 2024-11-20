package com.asm.asm3.Repositories;

import com.asm.asm3.DTOs.CartItemDetailDto;
import com.asm.asm3.Models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Query(value = "SELECT c.id AS cartItemId, c.quantity, s.id AS sizeId, s.size AS size, p.id AS productId, " +
            "p.name AS productName, p.price AS productPrice " +
            "FROM cart_item c " +
            "JOIN product_size s ON c.size_id = s.id " +
            "JOIN product p ON s.product_id = p.id " +
            "WHERE c.order_id = ?1", nativeQuery = true)
    List<CartItemDetailDto> findCartItemDetailsByOrderId(Long orderId);
}
