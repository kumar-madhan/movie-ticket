package com.cinema.app.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    private String status;
    private String stripeId;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;
}
