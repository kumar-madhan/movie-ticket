package com.cinema.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private Long id;
    private String movieTitle;
    private String theaterName;
    private Integer screenNumber;
    private String startTime;
    private List<String> seats;
    private Double totalAmount;
    private String bookingDate;
}
