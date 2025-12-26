package com.cinema.app.controller;

import com.cinema.app.model.Showtime;
import com.cinema.app.service.ShowtimeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/showtimes")
@CrossOrigin(origins = "*")
public class ShowtimeController {

    private final ShowtimeService showtimeService;

    public ShowtimeController(ShowtimeService showtimeService) {
        this.showtimeService = showtimeService;
    }

    @GetMapping
    public List<Showtime> getByMovie(@RequestParam Long movieId) {
        return showtimeService.getShowtimesByMovie(movieId);
    }

    @GetMapping("/{id}")
    public Showtime getShowtime(@PathVariable Long id) {
        return showtimeService.getShowtime(id);
    }
}
