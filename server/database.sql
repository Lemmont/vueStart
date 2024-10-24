CREATE DATABASE test;

CREATE TABLE users ( id SERIAL PRIMARY KEY, name VARCHAR(255), password VARCHAR(255));
CREATE TABLE posts ( id SERIAL PRIMARY KEY, author_id INT references users(id) NOT NULL);