package com.cinema.app.controller;

import com.cinema.app.model.Seat;
import com.cinema.app.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/screens")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ScreenController {

    private final SeatRepository seatRepository;

    @GetMapping("/{screenId}/seats")
    public List<Seat> getSeatsByScreen(@PathVariable Long screenId) {
        return seatRepository.findByScreenId(screenId);
    }
}
