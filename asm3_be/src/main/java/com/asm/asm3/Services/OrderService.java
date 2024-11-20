package com.asm.asm3.Services;

import com.asm.asm3.DTOs.OrderCreateDto;
import com.asm.asm3.DTOs.OrderDetailResponse;
import com.asm.asm3.DTOs.OrderUpdateStatusDto;
import com.asm.asm3.Models.CartItem;
import com.asm.asm3.Models.DeliveryStatus;
import com.asm.asm3.Models.Order;
import com.asm.asm3.Models.ProductSize;
import com.asm.asm3.Models.User;
import com.asm.asm3.Repositories.OrderRepository;
import com.asm.asm3.Repositories.ProductSizeRepository;
import com.asm.asm3.Repositories.UserRepository;
import com.asm.asm3.Repositories.CartItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductSizeRepository productSizeRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Order createOrder(OrderCreateDto orderCreateDto) {
        // Retrieve the user by customerId
        User user = userRepository.findById(orderCreateDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + orderCreateDto.getUserId()));

        // Create the order
        Order order = new Order();
        order.setConsignee(orderCreateDto.getConsignee());
        order.setConsigneePhone(orderCreateDto.getConsigneePhone());
        order.setDeliveryAddress(orderCreateDto.getDeliveryAddress());
        order.setDeliveryStatus(DeliveryStatus.CHUA_XET_DUYET);
        order.setPaymentMethod(orderCreateDto.getPaymentMethod());
        order.setPaymentStatus(orderCreateDto.getPaymentStatus());
        order.setSentMail(orderCreateDto.getSentMail());
        order.setTotalAmount(orderCreateDto.getTotalAmount());
        order.setUser(user);

        // Save the order
        Order savedOrder = orderRepository.save(order);

        // Create cart items
        List<CartItem> cartItems = orderCreateDto.getCartItems().stream()
                .filter(dto -> dto.getQuantity() > 0)
                .map(dto -> {
                    CartItem cartItem = new CartItem();

                    ProductSize productSize = productSizeRepository.findById(dto.getSizeId())
                            .orElseThrow(
                                    () -> new RuntimeException("ProductSize not found with id: " + dto.getSizeId()));

                    if (productSize.getQuantity() < dto.getQuantity()) {
                        throw new RuntimeException("Not enough stock for size " + productSize.getSize());
                    }

                    cartItem.setQuantity(dto.getQuantity());
                    cartItem.setSize(productSize);
                    cartItem.setOrder(savedOrder);

                    return cartItem;
                })
                .collect(Collectors.toList());

        // Save all cart items associated with the order
        cartItemRepository.saveAll(cartItems);

        return savedOrder;
    }

    @Transactional
    public Order updateOrder(Long id, OrderUpdateStatusDto orderUpdateDto) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        order.setConsignee(orderUpdateDto.getConsignee());
        order.setConsigneePhone(orderUpdateDto.getConsigneePhone());
        order.setDeliveryAddress(orderUpdateDto.getDeliveryAddress());
        order.setDeliveryStatus(orderUpdateDto.getDeliveryStatus());

        order.setPaymentMethod(orderUpdateDto.getPaymentMethod());
        order.setPaymentStatus(orderUpdateDto.getPaymentStatus());
        order.setSentMail(orderUpdateDto.getSentMail());
        order.setTotalAmount(orderUpdateDto.getTotalAmount());

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public OrderDetailResponse getCartItemDetailsByOrderId(Long orderId) {
        Order orderFound = orderRepository.findById(orderId).orElseThrow(
                () -> new RuntimeException("OrderId not found with id: " + orderId));

        OrderDetailResponse orderDetailResponse = new OrderDetailResponse();
        orderDetailResponse.setCartItemDetails(cartItemRepository.findCartItemDetailsByOrderId(orderId));
        orderDetailResponse.setConsignee(orderFound.getConsignee());
        orderDetailResponse.setConsigneePhone(orderFound.getConsigneePhone());
        orderDetailResponse.setDeliveryAddress(orderFound.getDeliveryAddress());
        orderDetailResponse.setPaymentMethod(orderFound.getPaymentMethod());
        orderDetailResponse.setPaymentStatus(orderFound.getPaymentStatus());
        orderDetailResponse.setTotalAmount(orderFound.getTotalAmount());
        orderDetailResponse.setSentMail(orderFound.getSentMail());
        orderDetailResponse.setTotalAmount(orderFound.getTotalAmount());
        orderDetailResponse.setUserId(orderFound.getUser().getId());
        orderDetailResponse.setUserName(orderFound.getUser().getName());
        orderDetailResponse.setCreatedAt(orderFound.getCreatedAt());
        orderDetailResponse.setId(orderFound.getId());
        orderDetailResponse.setDeliveryStatus(orderFound.getDeliveryStatus());

        return orderDetailResponse;
    }
}
