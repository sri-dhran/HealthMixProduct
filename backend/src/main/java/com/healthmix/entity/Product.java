package com.healthmix.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    private String id; // e.g. "prod-classic"

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer totalStock = 0;

    @Column(nullable = false)
    private Integer availableStock = 0;

    public Product() {}

    public Product(String id, String name, Integer totalStock, Integer availableStock) {
        this.id = id;
        this.name = name;
        this.totalStock = totalStock;
        this.availableStock = availableStock;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getTotalStock() {
        return totalStock;
    }

    public void setTotalStock(Integer totalStock) {
        this.totalStock = totalStock;
    }

    public Integer getAvailableStock() {
        return availableStock;
    }

    public void setAvailableStock(Integer availableStock) {
        this.availableStock = availableStock;
    }
}
