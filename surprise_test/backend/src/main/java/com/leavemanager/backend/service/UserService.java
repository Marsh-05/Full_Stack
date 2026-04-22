package com.leavemanager.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leavemanager.backend.entity.User;
import com.leavemanager.backend.repository.UserRepository;

@Service // Tells Spring Boot this is a Service class
public class UserService {

    @Autowired // This automatically brings in our Repository so we can use its methods
    private UserRepository userRepository;

    // 1. REGISTER LOGIC
    public User registerUser(User user) {
        // Check if username is already taken
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Username already exists!");
        }
        
        // If the role is empty, make them an "EMPLOYEE" by default
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("EMPLOYEE");
        }
        
        // Save the user to the database!
        return userRepository.save(user);
    }

    // 2. LOGIN LOGIC
    public User loginUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        
        // Check if user exists and passwords match
        // Note: We are using plain text passwords for now to keep it simple. 
        // We will secure this later!
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        
        throw new RuntimeException("Invalid username or password");
    }
}