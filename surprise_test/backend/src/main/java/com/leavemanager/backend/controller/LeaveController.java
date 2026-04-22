package com.leavemanager.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.leavemanager.backend.entity.LeaveRequest;
import com.leavemanager.backend.service.LeaveRequestService;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "*") // Allows React to connect later
public class LeaveController {

    @Autowired
    private LeaveRequestService leaveService;

    // POST: http://localhost:8080/api/leaves/apply
    @PostMapping("/apply")
    public LeaveRequest apply(@RequestBody LeaveRequest request) {
        return leaveService.applyForLeave(request);
    }

    // GET: http://localhost:8080/api/leaves/user/1
    @GetMapping("/user/{userId}")
    public List<LeaveRequest> getUserLeaves(@PathVariable Long userId) {
        // @PathVariable takes the "1" from the URL and puts it into the userId variable
        return leaveService.getLeavesByUserId(userId);
    }

    // GET: http://localhost:8080/api/leaves/all
    @GetMapping("/all")
    public List<LeaveRequest> getAllLeaves() {
        return leaveService.getAllLeaves();
    }

    // PUT: http://localhost:8080/api/leaves/1/status?status=APPROVED
    @PutMapping("/{leaveId}/status")
    public LeaveRequest updateStatus(@PathVariable Long leaveId, @RequestParam String status) {
        // @RequestParam takes the "?status=APPROVED" part of the URL
        return leaveService.updateLeaveStatus(leaveId, status);
    }
}