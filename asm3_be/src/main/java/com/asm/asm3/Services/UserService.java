package com.asm.asm3.Services;

import com.asm.asm3.Models.Order;
import com.asm.asm3.Models.User;
import com.asm.asm3.Models.UserRole;
import com.asm.asm3.DTOs.UserDetailsWithOrdersDto;
import com.asm.asm3.DTOs.UserLoginDto;
import com.asm.asm3.DTOs.UserRegistrationDto;
import com.asm.asm3.Repositories.OrderRepository;
import com.asm.asm3.Repositories.UserRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    public User registerUser(UserRegistrationDto registrationDto) {
        User user = new User();
        user.setName(registrationDto.getName());
        user.setEmail(registrationDto.getEmail());
        user.setPassword(registrationDto.getPassword());
        user.setPhone(registrationDto.getPhone());
        user.setRole(UserRole.CUSTOMER);
        return userRepository.save(user);
    }

    public User loginUser(UserLoginDto loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail());
        if (user != null && user.getPassword().equals(loginDto.getPassword())
                && user.getRole().equals(UserRole.CUSTOMER)) {
            return user;
        }
        return null;
    }

    public User loginAdmin(UserLoginDto loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail());
        if (user != null && user.getPassword().equals(loginDto.getPassword())
                && user.getRole().equals(UserRole.ADMIN)) {
            return user;
        }
        return null;
    }

    public UserDetailsWithOrdersDto getUserDetailsWithOrders(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found with ID: " + userId);
        }

        User user = optionalUser.get();
        List<Order> orders = orderRepository.findByUser(user);

        // Remove user of automatical mapping
        orders.forEach(order -> order.setUser(null));

        UserDetailsWithOrdersDto dto = new UserDetailsWithOrdersDto();
        dto.setUserId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setOrders(orders);

        return dto;
    }

}
