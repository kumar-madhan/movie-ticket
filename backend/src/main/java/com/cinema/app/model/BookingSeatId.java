package com.cinema.app.model;

import lombok.*;
import java.io.Serializable;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class BookingSeatId implements Serializable {
    private Long booking;
    private Long seat;
}
