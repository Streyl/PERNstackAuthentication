CREATE DATABASE jwttutorial;


--set extention
CREATE TABLE users(
user_id BIGSERIAL PRIMARY KEY,
user_name VARCHAR(255) NOT NULL,
user_email VARCHAR(255) NOT NULL,
user_password VARCHAR(255) NOT NULL
);

INSERT INTO users (user_name, user_email, user_password) VALUES ('Mortimer', 'morty@gmail.com', 'morty123');
INSERT INTO users (user_name, user_email, user_password) VALUES ('Sherlock', 'sherlock@gmail.com', 'sherlock123');
INSERT INTO users (user_name, user_email, user_password) VALUES ('Vika', 'Lyagishka@gmail.com', 'Kwakwa');
INSERT INTO users (user_name, user_email, user_password) VALUES ('Mila', 'alien@gmail.com', 'ALIEN123');
