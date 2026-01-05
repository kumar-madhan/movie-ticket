package com.cinema.app.service;

import com.cinema.app.dto.ShowtimeResponse;
import com.cinema.app.model.Showtime;
import com.cinema.app.repository.ShowtimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShowtimeService {

    private final ShowtimeRepository showtimeRepository;

    public List<Showtime> getAllShowtimes() {
        return showtimeRepository.findAll();
    }

    public Showtime getShowtime(Long id) {
        return showtimeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Showtime not found"));
    }

    public ShowtimeResponse mapToResponse(Showtime s) {
        return ShowtimeResponse.builder()
                .id(s.getId())
                .movieId(s.getMovie().getId())
                .movieTitle(s.getMovie().getTitle())
                .screenId(s.getScreen().getId())
                .screenNumber(s.getScreen().getScreenNumber())
                .theaterName(s.getScreen().getTheater().getName())
                .startTime(s.getStartTime().toString())
                .priceRegular(s.getPriceRegular())
                .pricePremium(s.getPricePremium())
                .build();
    }

    public List<ShowtimeResponse> getAllMappedShowtimes() {
        return showtimeRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ShowtimeResponse createShowtime(Showtime s) {
        return mapToResponse(showtimeRepository.save(s));
    }

    public ShowtimeResponse updateShowtime(Long id, Showtime updated) {
        Showtime existing = showtimeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Showtime not found"));

        existing.setMovie(updated.getMovie());
        existing.setScreen(updated.getScreen());
        existing.setStartTime(updated.getStartTime());
        existing.setPriceRegular(updated.getPriceRegular());
        existing.setPricePremium(updated.getPricePremium());

        return mapToResponse(showtimeRepository.save(existing));
    }

    public void deleteShowtime(Long id) {
        if (!showtimeRepository.existsById(id)) {
            throw new RuntimeException("Showtime not found");
        }
        showtimeRepository.deleteById(id);
    }
}
