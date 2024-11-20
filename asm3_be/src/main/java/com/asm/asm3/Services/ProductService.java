package com.asm.asm3.Services;

import com.asm.asm3.DTOs.ProductCreateDto;
import com.asm.asm3.DTOs.ProductDetailDto;
import com.asm.asm3.DTOs.ProductUpdateDto;
import com.asm.asm3.Models.Product;
import com.asm.asm3.Models.ProductSize;
import com.asm.asm3.Repositories.ProductRepository;
import com.asm.asm3.Repositories.ProductSizeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.function.Function;

import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductSizeRepository productSizeRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsForClient() {
        return productRepository.findAll().stream()
                .filter(product -> "available".equals(product.getStatus()))
                .map(product -> {
                    List<ProductSize> availableSizes = product.getProductSizes().stream()
                            .peek(size -> size.setCartItems(null)) // Remove cartItem
                            .collect(Collectors.toList());
                    product.setProductSizes(availableSizes);
                    return product;
                })
                .collect(Collectors.toList());
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product, ProductCreateDto productCreateDto) {
        Product productCreated = productRepository.save(product);
        List<ProductSize> productSizes = new ArrayList<>();

        addProductSizeIfQuantityExists(productSizes, productCreated, productCreateDto.getSize_38_quantity(), 38);
        addProductSizeIfQuantityExists(productSizes, productCreated, productCreateDto.getSize_39_quantity(), 39);
        addProductSizeIfQuantityExists(productSizes, productCreated, productCreateDto.getSize_40_quantity(), 40);
        addProductSizeIfQuantityExists(productSizes, productCreated, productCreateDto.getSize_41_quantity(), 41);
        addProductSizeIfQuantityExists(productSizes, productCreated, productCreateDto.getSize_42_quantity(), 42);

        productSizeRepository.saveAll(productSizes);
        return productCreated;
    }

    public Product updateProduct(Long id, ProductUpdateDto productUpdateDto) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        existingProduct.setName(productUpdateDto.getName());
        existingProduct.setStatus(productUpdateDto.getStatus());
        existingProduct.setBrand(productUpdateDto.getBrand());
        existingProduct.setCategory(productUpdateDto.getCategory());
        existingProduct.setDescription(productUpdateDto.getDescription());
        existingProduct.setPrice(productUpdateDto.getPrice());

        productRepository.save(existingProduct);

        List<ProductSize> updatedSizes = updateProductSizes(existingProduct, productUpdateDto);
        productSizeRepository.saveAll(updatedSizes);

        return existingProduct;
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        productRepository.delete(product);
    }

    public ProductDetailDto getProductDetails(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        ProductDetailDto productDetailDto = new ProductDetailDto();
        productDetailDto.setId(product.getId());
        productDetailDto.setName(product.getName());
        productDetailDto.setPrice(product.getPrice());
        productDetailDto.setDescription(product.getDescription());
        productDetailDto.setBrand(product.getBrand());
        productDetailDto.setCategory(product.getCategory());
        productDetailDto.setImagePath(product.getImagePath());
        productDetailDto.setStatus(product.getStatus());

        for (ProductSize productSize : product.getProductSizes()) {
            switch (productSize.getSize()) {
                case 38 -> {
                    productDetailDto.setSize_38_quantity(productSize.getQuantity());
                    productDetailDto.setSize_38_id(productSize.getId());
                }
                case 39 -> {
                    productDetailDto.setSize_39_quantity(productSize.getQuantity());
                    productDetailDto.setSize_39_id(productSize.getId());
                }
                case 40 -> {
                    productDetailDto.setSize_40_quantity(productSize.getQuantity());
                    productDetailDto.setSize_40_id(productSize.getId());
                }
                case 41 -> {
                    productDetailDto.setSize_41_quantity(productSize.getQuantity());
                    productDetailDto.setSize_41_id(productSize.getId());
                }
                case 42 -> {
                    productDetailDto.setSize_42_quantity(productSize.getQuantity());
                    productDetailDto.setSize_42_id(productSize.getId());
                }
            }
        }

        return productDetailDto;
    }

    private List<ProductSize> updateProductSizes(Product product, ProductUpdateDto productUpdateDto) {
        List<ProductSize> productSizes = new ArrayList<>();
        Map<Integer, ProductSize> existingSizes = product.getProductSizes().stream()
                .collect(Collectors.toMap(ProductSize::getSize, Function.identity()));

        updateOrCreateSize(existingSizes, productSizes, productUpdateDto.getSize_38_quantity(), 38, product);
        updateOrCreateSize(existingSizes, productSizes, productUpdateDto.getSize_39_quantity(), 39, product);
        updateOrCreateSize(existingSizes, productSizes, productUpdateDto.getSize_40_quantity(), 40, product);
        updateOrCreateSize(existingSizes, productSizes, productUpdateDto.getSize_41_quantity(), 41, product);
        updateOrCreateSize(existingSizes, productSizes, productUpdateDto.getSize_42_quantity(), 42, product);

        return productSizes;
    }

    private void addProductSizeIfQuantityExists(List<ProductSize> productSizes, Product product, int quantity,
            int size) {
        if (quantity > 0) {
            ProductSize productSize = new ProductSize();
            productSize.setProduct(product);
            productSize.setSize(size);
            productSize.setQuantity(quantity);
            productSizes.add(productSize);
        }
    }

    private void updateOrCreateSize(Map<Integer, ProductSize> existingSizes, List<ProductSize> productSizes,
            int quantity, int size, Product product) {
        if (quantity > 0) {
            ProductSize productSize = existingSizes.getOrDefault(size, new ProductSize());
            productSize.setProduct(product);
            productSize.setSize(size);
            productSize.setQuantity(quantity);
            productSizes.add(productSize);
        } else if (existingSizes.containsKey(size)) {
            productSizeRepository.delete(existingSizes.get(size));
        }
    }
}
