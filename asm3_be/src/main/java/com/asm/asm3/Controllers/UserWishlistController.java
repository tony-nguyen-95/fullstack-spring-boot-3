package com.asm.asm3.Controllers;

import com.asm.asm3.DTOs.UserWishlistCreateDto;
import com.asm.asm3.Models.UserWishlist;
import com.asm.asm3.Services.UserWishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class UserWishlistController {

    @Autowired
    private UserWishlistService userWishlistService;

    @PostMapping
    public ResponseEntity<UserWishlist> createWishlistItem(@RequestBody UserWishlistCreateDto request) {
        UserWishlist wishlist = new UserWishlist();
        wishlist.setCustomerId(request.getCustomerId());
        wishlist.setProductId(request.getProductId());
        wishlist.setCreatedAt(LocalDateTime.now());
        wishlist.setUpdatedAt(LocalDateTime.now());

        UserWishlist savedWishlist = userWishlistService.addWishlistItem(wishlist);
        return ResponseEntity.ok(savedWishlist);
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<List<UserWishlist>> getWishlistByCustomerId(@PathVariable Long customerId) {
        List<UserWishlist> wishlist = userWishlistService.getWishlistByCustomerId(customerId);
        return ResponseEntity.ok(wishlist);
    }

    @DeleteMapping("/{wishlistId}")
    public ResponseEntity<String> removeWishlistItem(@PathVariable Long wishlistId) {
        try {
            userWishlistService.removeWishlistItem(wishlistId);
            return ResponseEntity.ok("Wishlist item with ID " + wishlistId + " has been removed.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to remove wishlist item: " + e.getMessage());
        }
    }
}
