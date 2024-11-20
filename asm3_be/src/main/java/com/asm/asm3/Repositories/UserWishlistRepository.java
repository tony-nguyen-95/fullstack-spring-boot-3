package com.asm.asm3.Repositories;

import com.asm.asm3.Models.UserWishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserWishlistRepository extends JpaRepository<UserWishlist, Long> {
    List<UserWishlist> findByCustomerId(Long customerId);
}
