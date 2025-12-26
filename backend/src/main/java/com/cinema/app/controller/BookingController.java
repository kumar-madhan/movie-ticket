package com.cinema.app.controller;

import com.cinema.app.dto.BookingRequest;
import com.cinema.app.model.Booking;
import com.cinema.app.service.BookingService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking createBooking(@RequestBody BookingRequest req) {
        return bookingService.createBooking(
                req.getUserId(),
                req.getShowtimeId(),
                req.getSeatIds(),
                req.getTotalAmount()
        );
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingService.getUserBookings(userId);
    }
}
