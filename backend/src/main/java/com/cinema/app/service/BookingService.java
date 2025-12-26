package com.cinema.app.service;

import com.cinema.app.model.*;
import com.cinema.app.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepo;
    private final BookingSeatRepository bookingSeatRepo;
    private final SeatRepository seatRepo;
    private final UserRepository userRepo;
    private final ShowtimeRepository showtimeRepo;
    private final PaymentRepository paymentRepo;

    public BookingService(BookingRepository bookingRepo, BookingSeatRepository bookingSeatRepo,
                          SeatRepository seatRepo, UserRepository userRepo,
                          ShowtimeRepository showtimeRepo, PaymentRepository paymentRepo) {
        this.bookingRepo = bookingRepo;
        this.bookingSeatRepo = bookingSeatRepo;
        this.seatRepo = seatRepo;
        this.userRepo = userRepo;
        this.showtimeRepo = showtimeRepo;
        this.paymentRepo = paymentRepo;
    }

    @Transactional
    public Booking createBooking(Long userId, Long showtimeId, List<Long> seatIds, Double totalAmount) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Showtime showtime = showtimeRepo.findById(showtimeId).orElseThrow(() -> new RuntimeException("Showtime not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setShowtime(showtime);
        booking.setStatus("CONFIRMED");
        booking.setTotalAmount(totalAmount);
        bookingRepo.save(booking);

        for (Long seatId : seatIds) {
            Seat seat = seatRepo.findById(seatId).orElseThrow(() -> new RuntimeException("Seat not found"));
            BookingSeat bs = new BookingSeat();
            bs.setBooking(booking);
            bs.setSeat(seat);
            bookingSeatRepo.save(bs);
        }

        return booking;
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepo.findByUserId(userId);
    }
}
