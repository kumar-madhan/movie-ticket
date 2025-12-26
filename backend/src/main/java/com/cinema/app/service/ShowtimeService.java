package com.cinema.app.service;

import com.cinema.app.model.Showtime;
import com.cinema.app.repository.ShowtimeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ShowtimeService {

    private final ShowtimeRepository showtimeRepo;

    public ShowtimeService(ShowtimeRepository showtimeRepo) {
        this.showtimeRepo = showtimeRepo;
    }

    public List<Showtime> getShowtimesByMovie(Long movieId) {
        return showtimeRepo.findByMovieId(movieId);
    }

    public Showtime getShowtime(Long id) {
        return showtimeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Showtime not found"));
    }
}
