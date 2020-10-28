CREATE DATABASE diploma1;

CREATE TABLE employees(
employee_id BIGSERIAL PRIMARY KEY,
employee_email VARCHAR(255) NOT NULL,
employee_password VARCHAR(255) NOT NULL,
employee_first_name VARCHAR(255) NOT NULL,
employee_second_name VARCHAR(255) NOT NULL,
employee_phone_number VARCHAR(15) NOT NULL,
employee_position VARCHAR(255) NOT NULL,
employee_valid BOOLEAN NOT NULL DEFAULT TRUE
);


CREATE TABLE users(
user_id BIGSERIAL PRIMARY KEY,
user_email VARCHAR(255) NOT NULL,
user_password VARCHAR(255) NOT NULL,
user_first_name VARCHAR(255) NOT NULL,
user_second_name VARCHAR(255) NOT NULL,
user_phone_number VARCHAR(15) NOT NULL,
user_address VARCHAR(255) ,
user_valid BOOLEAN NOT NULL DEFAULT TRUE
);

--Critical, High, Medium, Low
CREATE TABLE tickets(
ticket_id BIGSERIAL PRIMARY KEY,
ticket_owner_id INTEGER NOT NULL,
ticket_assigned_employee_id INTEGER NOT NULL,
ticket_issue_id INTEGER NOT NULL,
ticket_information VARCHAR(255) NOT NULL,
ticket_date_open DATE NOT NULL DEFAULT CURRENT_DATE,
ticket_date_closed DATE,
ticket_status VARCHAR(255) NOT NULL DEFAULT 'PENDING',
ticket_priority VARCHAR(255) NOT NULL DEFAULT 'Low',  
ticket_rating INTEGER,
CONSTRAINT fk_user_id FOREIGN KEY (ticket_owner_id) REFERENCES users(user_id),
CONSTRAINT fk_employee_id FOREIGN KEY (ticket_assigned_employee_id) REFERENCES employees(employee_id),
CONSTRAINT fk_issue_id FOREIGN KEY (ticket_issue_id) REFERENCES issues(issue_id)
);

CREATE TABLE issues(
issue_id BIGSERIAL PRIMARY KEY,
issue_type VARCHAR(255) NOT NULL,
issue_information VARCHAR(255) NOT NULL
);

--Premade Issues
INSERT INTO issues (issue_type, issue_information) VALUES ( 'Software problem', 'OS: WIndows 10');
INSERT INTO issues (issue_type, issue_information) VALUES ( 'Software problem', 'OS: WIndows 7');
INSERT INTO issues (issue_type, issue_information) VALUES ( 'Hardware problem', 'Lenovo laptop');
INSERT INTO issues (issue_type, issue_information) VALUES ( 'Hardware problem', 'HP laptop');
INSERT INTO issues (issue_type, issue_information) VALUES ( 'Hardware problem', 'Dell laptop');
INSERT INTO issues (issue_type, issue_information) VALUES ( 'Internet connection problem', 'Pleas tell us the error u got');
INSERT INTO issues (issue_type, issue_information) VALUES ( 'Server problem', 'Oracle servers');

--Premade Employee
INSERT INTO employees (employee_first_name, employee_email, employee_password, employee_second_name, employee_phone_number, employee_position) VALUES ('Test','test12345@gmail.com','$2b$10$4U16rMbsgq/td8fYRpDmceUOs.2LvetTv7dbvqSTiJsP64dygTH32','Tester','123456789','Tester');
