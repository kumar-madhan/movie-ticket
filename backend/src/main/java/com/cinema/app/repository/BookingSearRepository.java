package com.cinema.app.repository;

import com.cinema.app.model.BookingSeat;
import com.cinema.app.model.BookingSeatId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingSeatRepository extends JpaRepository<BookingSeat, BookingSeatId> {
}
