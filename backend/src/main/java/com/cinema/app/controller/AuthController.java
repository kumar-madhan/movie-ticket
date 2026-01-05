// [Filename: backend/src/main/java/com/cinema/app/controller/AuthController.java]
// [Action: replace file]

package com.cinema.app.controller;

import com.cinema.app.dto.LoginRequest;
import com.cinema.app.dto.RegisterRequest;
import com.cinema.app.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest req) {
        return ResponseEntity.ok(authService.register(req.getEmail(), req.getPassword()));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.authenticate(req.getEmail(), req.getPassword()));
    }
}
