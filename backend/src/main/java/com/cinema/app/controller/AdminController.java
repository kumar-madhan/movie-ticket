package com.cinema.app.controller;

import com.cinema.app.dto.MovieDetailsResponse;
import com.cinema.app.model.Movie;
import com.cinema.app.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/movies")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final MovieService movieService;

    @GetMapping
    public ResponseEntity<List<MovieDetailsResponse>> listAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies().stream()
                .map(movieService::mapToDetailsResponse)
                .toList());
    }

    @PostMapping
    public ResponseEntity<MovieDetailsResponse> createMovie(@RequestBody Movie movie) {
        return ResponseEntity.ok(movieService.createMovie(movie));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MovieDetailsResponse> updateMovie(@PathVariable Long id, @RequestBody Movie updatedMovie) {
        return ResponseEntity.ok(movieService.updateMovie(id, updatedMovie));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
        return ResponseEntity.noContent().build();
    }
}
