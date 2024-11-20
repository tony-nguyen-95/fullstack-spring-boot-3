package com.asm.asm3.Controllers;

import com.asm.asm3.Models.User;
import com.asm.asm3.DTOs.UserDetailsWithOrdersDto;
import com.asm.asm3.DTOs.UserLoginDto;
import com.asm.asm3.DTOs.UserRegistrationDto;
import com.asm.asm3.DTOs.UserResponseDto;
import com.asm.asm3.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserRegistrationDto registrationDto) {
        User newUser = userService.registerUser(registrationDto);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> loginUser(@RequestBody UserLoginDto loginDto) {
        User user = userService.loginUser(loginDto);

        if (user != null) {
            UserResponseDto userResponseDto = new UserResponseDto(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getPhone(),
                    user.getRole());
            return ResponseEntity.ok(userResponseDto);
        }
        return ResponseEntity.status(401).body(null); // Return null or an appropriate error response
    }

    @PostMapping("/login-admin")
    public ResponseEntity<UserResponseDto> loginAdmin(@RequestBody UserLoginDto loginDto) {
        User user = userService.loginAdmin(loginDto);

        if (user != null) {
            UserResponseDto userResponseDto = new UserResponseDto(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getPhone(),
                    user.getRole());
            return ResponseEntity.ok(userResponseDto);
        }
        return ResponseEntity.status(401).body(null); // Return null or an appropriate error response
    }

    @GetMapping("/{id}")
    public UserDetailsWithOrdersDto getUserDetailsWithOrders(@PathVariable Long id) {
        return userService.getUserDetailsWithOrders(id);
    }
}
