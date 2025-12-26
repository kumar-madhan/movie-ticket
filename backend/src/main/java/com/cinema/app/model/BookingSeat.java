package com.cinema.app.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Table(name = "booking_seats")
@IdClass(BookingSeatId.class)
public class BookingSeat {

    @Id
    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @Id
    @ManyToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;
}
