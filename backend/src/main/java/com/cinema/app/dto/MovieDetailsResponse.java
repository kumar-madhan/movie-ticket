package com.cinema.app.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class MovieDetailsResponse {
    private Long id;
    private String title;
    private String description;
    private Integer duration;
    private String rating;
    private String posterUrl;
    private String tagline;
    private Boolean adult;
    private String originalLanguage;
    private String releaseDate;
    private String status;
    private Double voteAverage;
    private Integer voteCount;
    private String imdbId;
    private String homepage;
    private List<String> genres;
}
