DROP TABLE IF EXISTS LanguageWrittenIn;
DROP TABLE IF EXISTS Language;
DROP TABLE IF EXISTS IsGenre;
DROP TABLE IF EXISTS Genre;
DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS Book;
DROP TABLE IF EXISTS Author;

CREATE TABLE Author (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE Book (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	pagesNumber INT,
	countOfReview INT,
	publisher TEXT NOT NULL,
	publishDay INT,
	publishMonth INT,
	publishYear INT,
	description TEXT NOT NULL,
	rating FLOAT CHECK (rating >= 0 AND rating <=5),
	isbn INT NOT NULL,
	author_id INT REFERENCES Author(id)
);

CREATE TABLE Review(
	id	SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	book_id INT REFERENCES Book(id)
);

CREATE TABLE Genre(
	id	SERIAL PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE IsGenre(
	book_id INT REFERENCES Book(id),
	genre_id INT REFERENCES Genre(id),
	PRIMARY KEY (book_id, genre_id)
);
CREATE TABLE Language(
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE LanguageWrittenIn (
	book_id INT REFERENCES Book(id),
	language_id INT REFERENCES Language(id),
	PRIMARY KEY (book_id, language_id)
);


