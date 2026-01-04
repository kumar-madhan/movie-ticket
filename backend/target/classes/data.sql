INSERT INTO movies (title, description, duration, rating, poster_url)
VALUES
('Inception', 'A mind-bending thriller by Christopher Nolan', 148, 'PG-13', 'https://image.tmdb.org/t/p/original/inception.jpg'),
('Interstellar', 'A journey beyond the stars', 169, 'PG-13', 'https://image.tmdb.org/t/p/original/interstellar.jpg'),
('The Matrix', 'Neo discovers the real world', 136, 'R', 'https://image.tmdb.org/t/p/matrix.jpg'),
('Avengers: Endgame', 'The epic conclusion to the Infinity Saga', 180, 'PG-13', 'https://image.tmdb.org/t/p/original/endgame.jpg'),
('Oppenheimer', 'The story of J. Robert Oppenheimer and the Manhattan Project', 180, 'R', 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDyehy0rKCiFt3v.jpg'),
('Dune: Part Two', 'Paul Atreides unites with Chani to continue the fight', 166, 'PG-13', 'https://image.tmdb.org/t/p/w500/8bZp1tXD3Qt2McADuWwSBxmPHhK.jpg'),
('Barbie', 'Barbie has everything until she questions her world', 114, 'PG-13', 'https://image.tmdb.org/t/p/w500/1CBfj2qA3hqxr0I4jMgmbgW8YhT.jpg'),
('Spider-Man: No Way Home', 'Peter asks for help from Doctor Strange', 148, 'PG-13', 'https://image.tmdb.org/t/p/w500/scBdfxcnfYbo2d9jYVOWt0Wps04.jpg'),
('Top Gun: Maverick', 'Maverick trains a new generation of Top Gun graduates', 131, 'PG-13', 'https://image.tmdb.org/t/p/w500/DY91QbcPJ8uPzpRBBgmlqFivnHc.jpg'),
('The Dark Knight', 'Batman faces his greatest foe, the Joker', 152, 'PG-13', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'),
('Pulp Fiction', 'The lives of two mob hitmen intertwine', 154, 'R', 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPciEZpUa15.jpg'),
('Forrest Gump', 'Life is like a box of chocolates', 142, 'PG-13', 'https://image.tmdb.org/t/p/w500/clolk7rB5lLBbjFuJoepyiL1cJ9.jpg'),
('The Shawshank Redemption', 'Two imprisoned men bond over decades', 142, 'R', 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg'),
('Parasite', 'Greed and class discrimination threaten family bonds', 132, 'R', 'https://image.tmdb.org/t/p/w500/7IiTTjxrJcULsZGyCtYWYAJqBt.jpg')
ON CONFLICT (id) DO NOTHING;


INSERT INTO theaters (name, location, total_seats)
VALUES 
('Cineplex Downtown', 'Main Street', 100), ('Galaxy Cinema', 'Riverside', 120),
('IMAX City Center', 'Downtown Plaza', 250),
('Regal Multiplex', 'Suburban Mall', 180),
('AMC Riverwalk', 'Waterfront District', 200),
('Vue Cinema', 'North Side', 150),
('Odeon Luxe', 'Central Avenue', 220),
('Cineworld IMAX', 'East End', 300),
('Hollywood Bowl Theater', 'West Hills', 140)
ON CONFLICT (id) DO NOTHING;