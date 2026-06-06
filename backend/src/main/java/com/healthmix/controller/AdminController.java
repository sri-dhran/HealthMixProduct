package com.healthmix.controller;

import com.healthmix.entity.ContactMessage;
import com.healthmix.entity.User;
import com.healthmix.entity.Product;
import com.healthmix.repository.ContactMessageRepository;
import com.healthmix.repository.UserRepository;
import com.healthmix.repository.ProductRepository;
import com.healthmix.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ─── Admin Login ────────────────────────────────────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> adminLogin(@RequestBody Map<String, String> body) {
        String identifier = body.get("identifier");
        String password   = body.get("password");
        Map<String, String> response = new HashMap<>();

        Optional<User> optUser = userRepository.findByIdentifier(identifier);
        if (optUser.isEmpty()) {
            response.put("error", "Invalid admin credentials");
            return ResponseEntity.status(401).body(response);
        }

        User user = optUser.get();
        if (!"ADMIN".equals(user.getRole())) {
            response.put("error", "Access denied: not an admin");
            return ResponseEntity.status(403).body(response);
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            response.put("error", "Invalid admin credentials");
            return ResponseEntity.status(401).body(response);
        }

        String token = jwtUtil.generateToken(user.getIdentifier());
        response.put("token", token);
        response.put("role", "ADMIN");
        response.put("email", user.getIdentifier());
        return ResponseEntity.ok(response);
    }

    // ─── Stats ──────────────────────────────────────────────────────────────────
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats(@RequestHeader("Authorization") String authHeader) {
        if (!isAdmin(authHeader)) return ResponseEntity.status(403).build();

        Map<String, Object> stats = new HashMap<>();
        List<User> allUsers = userRepository.findAll();
        long totalUsers     = allUsers.stream().filter(u -> !"ADMIN".equals(u.getRole())).count();
        long verifiedUsers  = allUsers.stream().filter(u -> u.isVerified() && !"ADMIN".equals(u.getRole())).count();
        long totalMessages  = contactMessageRepository.count();

        long totalStockItems = 0;
        long lowStockCount = 0;
        List<Product> allProducts = productRepository.findAll();
        for (Product p : allProducts) {
            totalStockItems += p.getAvailableStock();
            if (p.getTotalStock() > 0 && ((double) p.getAvailableStock() / p.getTotalStock()) < 0.2) {
                lowStockCount++;
            }
        }

        stats.put("totalUsers", totalUsers);
        stats.put("verifiedUsers", verifiedUsers);
        stats.put("totalMessages", totalMessages);
        stats.put("unverifiedUsers", totalUsers - verifiedUsers);
        stats.put("totalStockItems", totalStockItems);
        stats.put("lowStockCount", lowStockCount);
        return ResponseEntity.ok(stats);
    }

    // ─── Users ──────────────────────────────────────────────────────────────────
    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getUsers(@RequestHeader("Authorization") String authHeader) {
        if (!isAdmin(authHeader)) return ResponseEntity.status(403).build();

        List<Map<String, Object>> result = new ArrayList<>();
        userRepository.findAll().stream()
            .filter(u -> !"ADMIN".equals(u.getRole()))
            .forEach(u -> {
                Map<String, Object> m = new LinkedHashMap<>();
                m.put("id", u.getId());
                m.put("identifier", u.getIdentifier());
                m.put("isVerified", u.isVerified());
                m.put("role", u.getRole());
                m.put("createdAt", u.getCreatedAt() != null ? u.getCreatedAt().toString() : null);
                result.add(m);
            });
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {
        if (!isAdmin(authHeader)) return ResponseEntity.status(403).build();

        Map<String, String> response = new HashMap<>();
        if (!userRepository.existsById(id)) {
            response.put("error", "User not found");
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        response.put("message", "User deleted");
        return ResponseEntity.ok(response);
    }

    // ─── Messages ───────────────────────────────────────────────────────────────
    @GetMapping("/messages")
    public ResponseEntity<List<ContactMessage>> getMessages(@RequestHeader("Authorization") String authHeader) {
        if (!isAdmin(authHeader)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(contactMessageRepository.findAll());
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Map<String, String>> deleteMessage(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {
        if (!isAdmin(authHeader)) return ResponseEntity.status(403).build();

        Map<String, String> response = new HashMap<>();
        if (!contactMessageRepository.existsById(id)) {
            response.put("error", "Message not found");
            return ResponseEntity.notFound().build();
        }
        contactMessageRepository.deleteById(id);
        response.put("message", "Message deleted");
        return ResponseEntity.ok(response);
    }

    // ─── Products / Inventory ──────────────────────────────────────────────────
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts(@RequestHeader("Authorization") String authHeader) {
        if (!isAdmin(authHeader)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(productRepository.findAll());
    }

    @PutMapping("/products/{id}/stock")
    public ResponseEntity<Product> updateStock(
            @PathVariable String id,
            @RequestBody Map<String, Integer> body,
            @RequestHeader("Authorization") String authHeader) {
        if (!isAdmin(authHeader)) return ResponseEntity.status(403).build();

        Optional<Product> optProduct = productRepository.findById(id);
        if (optProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product product = optProduct.get();
        if (body.containsKey("totalStock")) {
            product.setTotalStock(body.get("totalStock"));
        }
        if (body.containsKey("availableStock")) {
            product.setAvailableStock(body.get("availableStock"));
        }

        productRepository.save(product);
        return ResponseEntity.ok(product);
    }

    // ─── Helper ─────────────────────────────────────────────────────────────────
    private boolean isAdmin(String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) return false;
            String token = authHeader.substring(7);
            String identifier = jwtUtil.extractUsername(token);
            Optional<User> user = userRepository.findByIdentifier(identifier);
            return user.isPresent() && "ADMIN".equals(user.get().getRole());
        } catch (Exception e) {
            return false;
        }
    }
}
