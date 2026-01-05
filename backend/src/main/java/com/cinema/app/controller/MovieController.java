package com.cinema.app.controller;

import com.cinema.app.dto.MovieDetailsResponse;
import com.cinema.app.model.Movie;
import com.cinema.app.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping
    public ResponseEntity<List<MovieDetailsResponse>> getAllMovies() {
        List<MovieDetailsResponse> movies = movieService.getAllMovies().stream()
                .map(movieService::mapToDetailsResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieDetailsResponse> getMovieById(@PathVariable Long id) {
        return ResponseEntity.ok(movieService.getMovieDetails(id));
    }
}
