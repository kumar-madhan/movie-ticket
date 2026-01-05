package com.cinema.app.controller;

import com.cinema.app.dto.BookingRequest;
import com.cinema.app.dto.BookingResponse;
import com.cinema.app.model.User;
import com.cinema.app.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody BookingRequest req
    ) {
        return ResponseEntity.ok(bookingService.createBooking(userDetails.getUsername(), req));
    }

    @GetMapping
    public ResponseEntity<List<BookingResponse>> getUserBookings(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(bookingService.getBookingsByUserEmail(userDetails.getUsername()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> getBookingById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(bookingService.getBookingById(id, userDetails.getUsername()));
    }
}
