package com.cinema.app.service;

import com.cinema.app.dto.BookingRequest;
import com.cinema.app.dto.BookingResponse;
import com.cinema.app.model.*;
import com.cinema.app.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ShowtimeRepository showtimeRepository;
    private final SeatRepository seatRepository;
    private final BookingSeatRepository bookingSeatRepository;

    @Transactional
    public BookingResponse createBooking(String userEmail, BookingRequest req) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Showtime showtime = showtimeRepository.findById(req.getShowtimeId())
                .orElseThrow(() -> new RuntimeException("Showtime not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setShowtime(showtime);
        booking.setTotalAmount(req.getTotalAmount());
        booking.setBookingTime(LocalDateTime.now());
        Booking savedBooking = bookingRepository.save(booking);

        List<Seat> seats = seatRepository.findAllById(req.getSeatIds());
        List<BookingSeat> bookingSeats = seats.stream().map(seat -> {
            BookingSeat bs = new BookingSeat();
            bs.setBooking(savedBooking);
            bs.setSeat(seat);
            return bs;
        }).toList();

        bookingSeatRepository.saveAll(bookingSeats);
        savedBooking.setBookingSeats(bookingSeats);

        return mapToResponse(savedBooking);
    }

    public List<BookingResponse> getBookingsByUserEmail(String email) {
        return bookingRepository.findByUserEmail(email)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public BookingResponse getBookingById(Long id, String email) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if (!booking.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }
        return mapToResponse(booking);
    }

    private BookingResponse mapToResponse(Booking b) {
        return BookingResponse.builder()
                .id(b.getId())
                .movieTitle(b.getShowtime().getMovie().getTitle())
                .theaterName(b.getShowtime().getScreen().getTheater().getName())
                .screenNumber(b.getShowtime().getScreen().getScreenNumber())
                .startTime(b.getShowtime().getStartTime().toString())
                .bookingDate(b.getBookingTime().toString())
                .totalAmount(b.getTotalAmount())
                .seats(b.getBookingSeats().stream()
                        .map(bs -> bs.getSeat().getRowLabel() + bs.getSeat().getSeatNumber())
                        .collect(Collectors.toList()))
                .build();
    }
}
