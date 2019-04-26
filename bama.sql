DROP DATABASE IF EXISTS bama;

CREATE DATABASE bama;
USE bama;

CREATE TABLE products(
    -- department_id
department_id INTEGER(25) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
-- department_name
department_name VARCHAR(100) NOT NULL,
price DECIMAL (30,3) NOT NULL,
stock_quantity INTEGER(25) NOT NULL,
PRIMARY KEY (item_id)
);



-- DROP DATABASE IF EXISTS greatbay_db;

-- CREATE DATABASE greatbay_db;

-- USE greatbay_db;

-- CREATE TABLE auction(
--     id INT AUTO_INCREMENT NOT NULL,
--     title VARCHAR(100) NOT NULL,
--     bid DECIMAL(9,2) NOT NULL DEFAULT 0,
--     category VARCHAR(100),
--     PRIMARY KEY(id)
-- );

INSERT INTO products(department_id, department_name, price, stock_quantity)
VALUES ("Samsung tablet", "Electronics", 200.99, 5),
("coding books", "Education", 200.99, 5),
("blankest", "Home", 200.99, 5),
("Samsung tablet", "Cosmetic", 200.99, 5),
("Samsung tablet", "body", 200.99, 5),
("Samsung tablet", "electronics", 200.99, 5),
("Samsung tablet", "Electronics", 200.99, 5),
("Samsung tablet", "Electronics", 200.99, 5),
("Samsung tablet", "Electronics", 200.99, 5),
("Samsung tablet", "Electronics", 200.99, 5);


