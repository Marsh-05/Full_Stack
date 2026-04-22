package com.leavemanager.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leavemanager.backend.entity.LeaveRequest;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    
    // Finds all leave requests for a specific employee
    List<LeaveRequest> findByUserId(Long userId);
}