package com.asm.asm3.DTOs;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

import com.asm.asm3.Models.DeliveryStatus;
import com.asm.asm3.Models.PaymentMethod;
import com.asm.asm3.Models.PaymentStatus;

@Data
public class OrderDetailResponse {
    private Long id;
    private String consignee;
    private String consigneePhone;
    private String deliveryAddress;
    private DeliveryStatus deliveryStatus;
    private String userName;
    private LocalDateTime createdAt;
    private PaymentMethod paymentMethod;
    private PaymentStatus paymentStatus;
    private Boolean sentMail;
    private Long totalAmount;
    private Long userId;
    private List<CartItemDetailDto> cartItemDetails;
}
