package com.cinema.app.service;

import com.cinema.app.dto.MovieDetailsResponse;
import com.cinema.app.model.Genre;
import com.cinema.app.model.Movie;
import com.cinema.app.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public MovieDetailsResponse getMovieDetails(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
        return mapToDetailsResponse(movie);
    }

    public MovieDetailsResponse mapToDetailsResponse(Movie movie) {
        return MovieDetailsResponse.builder()
                .id(movie.getId())
                .title(movie.getTitle())
                .description(movie.getDescription())
                .duration(movie.getDuration())
                .rating(movie.getRating())
                .posterUrl(movie.getPosterUrl())
                .tagline(movie.getTagline())
                .adult(movie.getAdult())
                .originalLanguage(movie.getOriginalLanguage())
                .releaseDate(movie.getReleaseDate())
                .status(movie.getStatus())
                .voteAverage(movie.getVoteAverage())
                .voteCount(movie.getVoteCount())
                .imdbId(movie.getImdbId())
                .homepage(movie.getHomepage())
                .genres(movie.getGenres()
                        .stream()
                        .map(Genre::getName)
                        .collect(Collectors.toList()))
                .build();
    }
    // existing imports and @Service annotation...

    public MovieDetailsResponse createMovie(Movie movie) {
        Movie saved = movieRepository.save(movie);
        return mapToDetailsResponse(saved);
    }

    public MovieDetailsResponse updateMovie(Long id, Movie updatedMovie) {
        Movie existing = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        existing.setTitle(updatedMovie.getTitle());
        existing.setDescription(updatedMovie.getDescription());
        existing.setDuration(updatedMovie.getDuration());
        existing.setRating(updatedMovie.getRating());
        existing.setPosterUrl(updatedMovie.getPosterUrl());
        existing.setTagline(updatedMovie.getTagline());
        existing.setAdult(updatedMovie.getAdult());
        existing.setOriginalLanguage(updatedMovie.getOriginalLanguage());
        existing.setReleaseDate(updatedMovie.getReleaseDate());
        existing.setStatus(updatedMovie.getStatus());
        existing.setVoteAverage(updatedMovie.getVoteAverage());
        existing.setVoteCount(updatedMovie.getVoteCount());
        existing.setImdbId(updatedMovie.getImdbId());
        existing.setHomepage(updatedMovie.getHomepage());
        existing.setGenres(updatedMovie.getGenres());

        Movie saved = movieRepository.save(existing);
        return mapToDetailsResponse(saved);
    }

    public void deleteMovie(Long id) {
        if (!movieRepository.existsById(id)) {
            throw new RuntimeException("Movie not found");
        }
        movieRepository.deleteById(id);
    }

}
