-- ===== THEATERS =====
INSERT INTO theaters (id, name, location, total_seats) VALUES
(1, 'PVR Cinemas', 'Bangalore', 250),
(2, 'INOX', 'Mumbai', 300),
(3, 'Cinepolis', 'Delhi', 200)
ON CONFLICT (id) DO NOTHING;

-- ===== SCREENS =====
INSERT INTO screens (id, theater_id, screen_number, total_seats) VALUES
(1, 1, 1, 100),
(2, 1, 2, 150),
(3, 2, 1, 120),
(4, 3, 1, 90)
ON CONFLICT (id) DO NOTHING;

-- ===== GENRES =====
INSERT INTO genres (id, name) VALUES
(1, 'Action'),
(2, 'Adventure'),
(3, 'Drama'),
(4, 'Sci-Fi'),
(5, 'Thriller')
ON CONFLICT (id) DO NOTHING;

-- ===== MOVIES =====
INSERT INTO movies (id, title, description, duration, rating, poster_url, tagline, adult, original_language, release_date, status, vote_average, vote_count, imdb_id, homepage)
VALUES
(1, 'Inception','A mind-bending thriller by Christopher Nolan',148,'PG-13',
'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg','Your mind is the scene of the crime',false,'en','2010-07-16','Released',8.8,36000,'tt1375666',null),
(2, 'Interstellar','A journey beyond the stars',169,'PG-13',
'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg','Mankind was born on Earth. It was never meant to die here.',false,'en','2014-11-07','Released',8.6,30000,'tt0816692',null),
(3, 'The Matrix','Neo discovers the real world',136,'R',
'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg','Welcome to the Real World',true,'en','1999-03-30','Released',8.7,28000,'tt0133093',null),
(4, 'The Dark Knight','Batman faces the Joker',152,'PG-13',
'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg','Why so serious?',false,'en','2008-07-18','Released',9.0,32000,'tt0468569',null),
(5, 'Fight Club','An underground fight club forms',139,'R',
'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg','Mischief. Mayhem. Soap.',true,'en','1999-10-15','Released',8.8,26000,'tt0137523',null)
ON CONFLICT (id) DO NOTHING;

-- ===== MOVIE GENRES (JOIN TABLE) =====
INSERT INTO movie_genres (movie_id, genre_id) VALUES
(1, 5), (1, 4), (2, 4), (2, 3), (3, 4), (4, 1), (4, 5), (5, 3)
ON CONFLICT DO NOTHING;

-- ===== SHOWTIMES =====
INSERT INTO showtimes (id, movie_id, screen_id, start_time, price_regular, price_premium)
VALUES
(1, 1, 1, '2026-01-05T18:00:00', 250, 400),
(2, 2, 2, '2026-01-05T20:00:00', 300, 450),
(3, 3, 3, '2026-01-06T19:30:00', 220, 380),
(4, 4, 4, '2026-01-07T21:00:00', 280, 420)
ON CONFLICT (id) DO NOTHING;
