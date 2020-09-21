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
INSERT INTO users (user_name, user_email, user_password) VALUES ('Mila', 'alien@gmail.com', 'ALIEN123');




CREATE DATABASE diploma;

CREATE TABLE user_rights(
    user_rights_id BIGSERIAL PRIMARY KEY,
    user_rights_text VARCHAR(255) NOT NULL
);

INSERT INTO user_rights (user_rights_text) VALUES ('Admin');
INSERT INTO user_rights (user_rights_text) VALUES ('User');


CREATE TABLE users(
user_id BIGSERIAL PRIMARY KEY,
user_name VARCHAR(255) NOT NULL,
user_sirname VARCHAR(255) NOT NULL,
user_email VARCHAR(255) NOT NULL,
user_password VARCHAR(255) NOT NULL,
user_active BOOLEAN NOT NULL DEFAULT TRUE,
rights_id INTEGER NOT NULL DEFAULT 2,
CONSTRAINT fk_user_rights_id FOREIGN KEY (rights_id) REFERENCES user_rights(user_rights_id)
);

INSERT INTO users (user_name, user_sirname, user_email, user_password, rights_id) VALUES ('Alex', 'Kazanzhy', 'alex@gmail.com', 'zknsTBnnz#', 1);
INSERT INTO users (user_name, user_sirname, user_email, user_password) VALUES ('Amanda', 'Morrison', 'amanda@gmail.com', 'amanda#');
INSERT INTO users (user_name, user_sirname, user_email, user_password) VALUES ('Boris', 'Morrison', 'boris@gmail.com', 'boris#');
INSERT INTO users (user_name, user_sirname, user_email, user_active, user_password) VALUES ('Alebert', 'Einstaine', 'albert@gmail.com', false, 'Albert#');