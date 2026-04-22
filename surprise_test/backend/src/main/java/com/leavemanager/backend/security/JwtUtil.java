package com.leavemanager.backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // This is our ultra-secret key used to sign the wristbands. 
    // In a real app, you hide this, but we will generate a secure one here!
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    
    // The wristband expires in 1 hour (3,600,000 milliseconds)
    private static final long EXPIRATION_TIME = 3600000;

    // 1. Generate Token (Make the wristband)
    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username) // Who is this for?
                .claim("role", role)  // Add their role to the token
                .setIssuedAt(new Date()) // When was it made?
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // When does it expire?
                .signWith(SECRET_KEY) // Stamp it with our secret signature
                .compact(); // Pack it all up into a string
    }

    // 2. Validate Token (Check if the wristband is real)
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false; // Fake or expired wristband!
        }
    }
}