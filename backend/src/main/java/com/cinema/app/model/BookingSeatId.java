package com.cinema.app.model;

import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode
public class BookingSeatId implements Serializable {
    private Long bookingId;
    private Long seatId;
}
