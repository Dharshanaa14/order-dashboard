package com.dashboard.ordersystem.controller;

import com.dashboard.ordersystem.dto.LoginRequest;
import com.dashboard.ordersystem.dto.LoginResponse;
import com.dashboard.ordersystem.model.Admin;
import com.dashboard.ordersystem.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        Admin admin = adminRepository.findByUsername(request.getUsername()).orElse(null);

        if (admin == null) {
            return new LoginResponse(false, "Admin not found");
        }

        if (!admin.getPassword().equals(request.getPassword())) {
            return new LoginResponse(false, "Invalid password");
        }

        return new LoginResponse(true, "Login successful");
    }
}