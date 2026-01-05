package com.cinema.app.controller;

import com.cinema.app.dto.ShowtimeResponse;
import com.cinema.app.model.Showtime;
import com.cinema.app.service.ShowtimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/showtimes")
@RequiredArgsConstructor
public class ShowtimeController {

    private final ShowtimeService showtimeService;

    @GetMapping
    public ResponseEntity<List<ShowtimeResponse>> getAllShowtimes() {
        return ResponseEntity.ok(showtimeService.getAllMappedShowtimes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShowtimeResponse> getShowtimeById(@PathVariable Long id) {
        return ResponseEntity.ok(showtimeService.mapToResponse(showtimeService.getShowtime(id)));
    }
}
