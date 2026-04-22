package com.leavemanager.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leavemanager.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Spring Boot is so smart that just by naming this method "findByUsername", 
    // it knows how to write the SQL to find a user by their username!
    User findByUsername(String username);
}