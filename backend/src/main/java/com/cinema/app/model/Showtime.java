package com.cinema.app.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Table(name = "showtimes")
public class Showtime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    @JsonBackReference
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "screen_id")
    @JsonBackReference
    private Screen screen;

    private LocalDateTime startTime;
    private Double priceRegular;
    private Double pricePremium;

    @OneToMany(mappedBy = "showtime", cascade = CascadeType.ALL)
    private List<Booking> bookings;
}
