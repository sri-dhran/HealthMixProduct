package com.healthmix.controller;

import com.healthmix.dto.ContactRequest;
import com.healthmix.dto.RecipeRequest;
import com.healthmix.entity.ContactMessage;
import com.healthmix.entity.Product;
import com.healthmix.repository.ContactMessageRepository;
import com.healthmix.repository.ProductRepository;
import com.healthmix.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // In production, restrict this to your frontend URL
public class ApiController {

    private final GeminiService geminiService;
    private final ContactMessageRepository contactMessageRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    public ApiController(GeminiService geminiService, ContactMessageRepository contactMessageRepository) {
        this.geminiService = geminiService;
        this.contactMessageRepository = contactMessageRepository;
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, Object>> handleContact(@RequestBody ContactRequest request) {
        Map<String, Object> response = new HashMap<>();

        if (request.getName() == null || request.getEmail() == null || request.getMessage() == null) {
            response.put("error", "Name, email, and message are required");
            return ResponseEntity.badRequest().body(response);
        }

        // Save to database
        ContactMessage contactMessage = new ContactMessage();
        contactMessage.setName(request.getName());
        contactMessage.setEmail(request.getEmail());
        contactMessage.setMessage(request.getMessage());
        contactMessageRepository.save(contactMessage);

        System.out.println("Saved contact message from " + request.getName() + " (" + request.getEmail() + "): " + request.getMessage());

        response.put("success", true);
        response.put("message", "Message received successfully!");
        return ResponseEntity.ok(response);
    }

    // ─── Purchase Endpoint (Auto-deducts stock) ─────────────────────────────────
    @PostMapping("/purchase")
    public ResponseEntity<Map<String, Object>> handlePurchase(
            @RequestBody List<Map<String, Object>> items) {
        Map<String, Object> response = new HashMap<>();

        // Validate stock availability before making any changes
        for (Map<String, Object> item : items) {
            String productId = (String) item.get("productId");
            int quantity = ((Number) item.get("quantity")).intValue();

            Optional<Product> optProduct = productRepository.findById(productId);
            if (optProduct.isEmpty()) {
                response.put("error", "Product not found: " + productId);
                return ResponseEntity.status(404).body(response);
            }
            Product product = optProduct.get();
            if (product.getAvailableStock() < quantity) {
                response.put("error", "Insufficient stock for: " + product.getName());
                return ResponseEntity.status(409).body(response);
            }
        }

        // All stock checks passed — deduct quantities
        for (Map<String, Object> item : items) {
            String productId = (String) item.get("productId");
            int quantity = ((Number) item.get("quantity")).intValue();

            Product product = productRepository.findById(productId).get();
            product.setAvailableStock(product.getAvailableStock() - quantity);
            productRepository.save(product);
            System.out.println("📦 Stock updated: " + product.getName() + " → " + product.getAvailableStock() + " remaining");
        }

        response.put("success", true);
        response.put("message", "Purchase processed. Stock updated.");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/generate-recipe")
    public ResponseEntity<Map<String, Object>> generateRecipe(@RequestBody RecipeRequest request) {
        Map<String, Object> response = new HashMap<>();

        if (request.getIngredients() == null || request.getIngredients().isEmpty()) {
            response.put("error", "Ingredients are required to generate a recipe.");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            String recipe = geminiService.generateRecipe(request.getIngredients(), request.getGoals());
            response.put("success", true);
            response.put("recipe", recipe);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", "Failed to generate recipe from AI");
            return ResponseEntity.internalServerError().body(response);
        }
    }
}
