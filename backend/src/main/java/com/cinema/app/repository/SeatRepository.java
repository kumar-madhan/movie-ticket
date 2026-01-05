package com.cinema.app.repository;

import com.cinema.app.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {

    List<Seat> findByScreenId(Long screenId);

    @Query("""
        SELECT bs.seat.id
        FROM BookingSeat bs
        WHERE bs.booking.showtime.id = :showtimeId
    """)
    List<Long> findBookedSeatIdsByShowtime(@Param("showtimeId") Long showtimeId);
}
