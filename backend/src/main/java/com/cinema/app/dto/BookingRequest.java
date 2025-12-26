package com.cinema.app.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter @Setter
public class BookingRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Showtime ID is required")
    private Long showtimeId;

    @NotNull(message = "Seat IDs are required")
    private List<Long> seatIds;

    @NotNull(message = "Total amount is required")
    private Double totalAmount;
}
