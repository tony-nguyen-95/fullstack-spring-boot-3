package com.asm.asm3.Controllers;

import com.asm.asm3.DTOs.OrderCreateDto;
import com.asm.asm3.DTOs.OrderDetailResponse;
import com.asm.asm3.DTOs.OrderUpdateStatusDto;
import com.asm.asm3.Models.Order;
import com.asm.asm3.Services.OrderService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderCreateDto orderCreateDto) {
        Order createdOrder = orderService.createOrder(orderCreateDto);

        return ResponseEntity.ok(createdOrder);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id,
            @RequestBody OrderUpdateStatusDto orderUpdateStatusDto) {
        Order updatedOrder = orderService.updateOrder(id, orderUpdateStatusDto);
        return ResponseEntity.ok(updatedOrder);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDetailResponse> getOrderDetails(@PathVariable Long id) {
        OrderDetailResponse orderDetail = orderService.getCartItemDetailsByOrderId(id);
        return ResponseEntity.ok(orderDetail);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }
}
