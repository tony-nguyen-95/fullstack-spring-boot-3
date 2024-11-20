package com.asm.asm3.Repositories;

import com.asm.asm3.Models.Order;
import com.asm.asm3.Models.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}