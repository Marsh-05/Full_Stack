package com.leavemanager.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.leavemanager.backend.entity.User;
import com.leavemanager.backend.security.JwtUtil;
import com.leavemanager.backend.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil; // Bring in our Wristband Maker!

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        // 1. Check if the username and password are correct
        User user = userService.loginUser(loginData.getUsername(), loginData.getPassword());
        
        // 2. If successful, generate the VIP Wristband (Token)
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        
        // 3. Package the User and the Token together to send back to React
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", token);
        
        return ResponseEntity.ok(response);
    }
}