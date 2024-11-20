package com.asm.asm3.Services;

import com.asm.asm3.Models.UserWishlist;
import com.asm.asm3.Repositories.UserWishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserWishlistService {

    @Autowired
    private UserWishlistRepository userWishlistRepository;

    public List<UserWishlist> getWishlistByCustomerId(Long customerId) {
        return userWishlistRepository.findByCustomerId(customerId);
    }

    public UserWishlist addWishlistItem(UserWishlist wishlist) {
        return userWishlistRepository.save(wishlist);
    }

    public void removeWishlistItem(Long wishlistId) {
        userWishlistRepository.deleteById(wishlistId);
    }
}
