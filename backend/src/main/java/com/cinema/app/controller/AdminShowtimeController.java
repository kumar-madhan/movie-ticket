package com.cinema.app.controller;

import com.cinema.app.dto.ShowtimeResponse;
import com.cinema.app.model.Showtime;
import com.cinema.app.service.ShowtimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/showtimes")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminShowtimeController {

    private final ShowtimeService showtimeService;

    @GetMapping
    public ResponseEntity<List<ShowtimeResponse>> listAll() {
        return ResponseEntity.ok(showtimeService.getAllMappedShowtimes());
    }

    @PostMapping
    public ResponseEntity<ShowtimeResponse> create(@RequestBody Showtime s) {
        return ResponseEntity.ok(showtimeService.createShowtime(s));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShowtimeResponse> update(@PathVariable Long id, @RequestBody Showtime s) {
        return ResponseEntity.ok(showtimeService.updateShowtime(id, s));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        showtimeService.deleteShowtime(id);
        return ResponseEntity.noContent().build();
    }
}
