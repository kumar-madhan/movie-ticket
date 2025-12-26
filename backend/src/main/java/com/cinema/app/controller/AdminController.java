package com.cinema.app.controller;

import com.cinema.app.model.Movie;
import com.cinema.app.model.Showtime;
import com.cinema.app.repository.MovieRepository;
import com.cinema.app.repository.ShowtimeRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final MovieRepository movieRepo;
    private final ShowtimeRepository showtimeRepo;

    public AdminController(MovieRepository movieRepo, ShowtimeRepository showtimeRepo) {
        this.movieRepo = movieRepo;
        this.showtimeRepo = showtimeRepo;
    }

    // ---- MOVIES ----
    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        return movieRepo.findAll();
    }

    @PostMapping("/movies")
    public Movie createMovie(@RequestBody Movie movie) {
        return movieRepo.save(movie);
    }

    @PutMapping("/movies/{id}")
    public Movie updateMovie(@PathVariable Long id, @RequestBody Movie updated) {
        Movie existing = movieRepo.findById(id).orElseThrow(() -> new RuntimeException("Movie not found"));
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setDuration(updated.getDuration());
        existing.setRating(updated.getRating());
        existing.setPosterUrl(updated.getPosterUrl());
        return movieRepo.save(existing);
    }

    @DeleteMapping("/movies/{id}")
    public void deleteMovie(@PathVariable Long id) {
        movieRepo.deleteById(id);
    }

    // ---- SHOWTIMES ----
    @GetMapping("/showtimes")
    public List<Showtime> getAllShowtimes() {
        return showtimeRepo.findAll();
    }

    @PostMapping("/showtimes")
    public Showtime createShowtime(@RequestBody Showtime showtime) {
        return showtimeRepo.save(showtime);
    }

    @DeleteMapping("/showtimes/{id}")
    public void deleteShowtime(@PathVariable Long id) {
        showtimeRepo.deleteById(id);
    }
}
