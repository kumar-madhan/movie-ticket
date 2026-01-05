package com.cinema.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShowtimeResponse {
    private Long id;
    private Long movieId;
    private String movieTitle;
    private Long screenId;
    private Integer screenNumber;
    private String theaterName;
    private String startTime;
    private Double priceRegular;
    private Double pricePremium;
}
