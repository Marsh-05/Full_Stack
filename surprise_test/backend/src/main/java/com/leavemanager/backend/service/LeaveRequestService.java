package com.leavemanager.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leavemanager.backend.entity.LeaveRequest;
import com.leavemanager.backend.repository.LeaveRequestRepository;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRepository;

    // 1. APPLY FOR LEAVE
    public LeaveRequest applyForLeave(LeaveRequest request) {
        // When an employee applies, it should always start as "PENDING"
        request.setStatus("PENDING");
        return leaveRepository.save(request);
    }

    // 2. GET LEAVES FOR A SPECIFIC EMPLOYEE
    public List<LeaveRequest> getLeavesByUserId(Long userId) {
        return leaveRepository.findByUserId(userId);
    }

    // 3. GET ALL LEAVES (For the Admin)
    public List<LeaveRequest> getAllLeaves() {
        return leaveRepository.findAll();
    }

    // 4. APPROVE OR REJECT LEAVE (Update status)
    public LeaveRequest updateLeaveStatus(Long leaveId, String newStatus) {
        // Find the leave request in the database by its ID
        LeaveRequest request = leaveRepository.findById(leaveId)
            .orElseThrow(() -> new RuntimeException("Leave request not found"));
        
        // Update the status ("APPROVED" or "REJECTED")
        request.setStatus(newStatus);
        
        // Save the updated request back to the database
        return leaveRepository.save(request);
    }
}