package com.cinema.app.controller;

import com.cinema.app.dto.LoginRequest;
import com.cinema.app.dto.RegisterRequest;
import com.cinema.app.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest req) {
        return authService.register(req.getEmail(), req.getName(), req.getPassword());
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest req) {
        return authService.login(req.getEmail(), req.getPassword());
    }
}
