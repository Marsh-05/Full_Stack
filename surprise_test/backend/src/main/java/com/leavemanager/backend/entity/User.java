package com.leavemanager.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users") // We name the table "users" because "user" is a restricted word in SQL
public class User {

    @Id // This tells Spring Boot that this is the Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // This makes the ID auto-increment (1, 2, 3...)
    private Long id;

    private String username;
    private String password;
    private String role; // We will store "EMPLOYEE" or "ADMIN" here

    // --- GETTERS AND SETTERS ---
    // These allow other parts of our app to read and change this data
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}