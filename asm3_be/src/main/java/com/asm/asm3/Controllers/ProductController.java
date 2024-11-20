package com.asm.asm3.Controllers;

import com.asm.asm3.DTOs.ProductCreateDto;
import com.asm.asm3.DTOs.ProductDetailDto;
import com.asm.asm3.DTOs.ProductUpdateDto;
import com.asm.asm3.Models.Product;
import com.asm.asm3.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/product-client")
    public List<Product> getProducts() {
        return productService.getProductsForClient();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailDto> getProductById(@PathVariable Long id) {
        try {
            ProductDetailDto productDetailDto = productService.getProductDetails(id);
            return ResponseEntity.ok(productDetailDto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(consumes = "multipart/form-data")
    public Product createProduct(ProductCreateDto dto) throws IOException {
        Product product = new Product();
        product.setName(dto.getName());
        product.setStatus(dto.getStatus());
        product.setBrand(dto.getBrand());
        product.setCategory(dto.getCategory());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setIsDelete(false);

        if (dto.getFileNameImage() != null && !dto.getFileNameImage().isEmpty()) {
            String originalFileName = dto.getFileNameImage().getOriginalFilename();
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

            String uniqueFileName = timestamp + "_" + originalFileName;

            Path staticPath = Paths.get("src/main/resources/static");
            Path filePath = staticPath.resolve(uniqueFileName);
            Files.createDirectories(staticPath);

            Files.write(filePath, dto.getFileNameImage().getBytes());

            product.setImagePath("/" + uniqueFileName);
        }

        return productService.createProduct(product, dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id,
            @RequestBody ProductUpdateDto productUpdateDto) {
        return ResponseEntity.ok(productService.updateProduct(id, productUpdateDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
