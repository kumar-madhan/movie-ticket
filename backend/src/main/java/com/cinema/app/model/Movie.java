package com.cinema.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(
    name = "movies",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "imdb_id")
    }
)
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer duration;
    private String rating;

    @Column(name = "poster_url")
    private String posterUrl;

    private String tagline;
    private Boolean adult;

    @Column(name = "original_language")
    private String originalLanguage;

    @Column(name = "release_date")
    private String releaseDate;

    private String status;

    @Column(name = "vote_average")
    private Double voteAverage;

    @Column(name = "vote_count")
    private Integer voteCount;

    @Column(name = "imdb_id", unique = true)
    private String imdbId;

    private String homepage;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "movie_genres",
        joinColumns = @JoinColumn(name = "movie_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres = new HashSet<>();
}
