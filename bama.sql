DROP DATABASE IF EXISTS bama;

CREATE DATABASE bama;
USE bama;

CREATE TABLE products(
item_id INTEGER(25) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL (30,3) NOT NULL,
stock_quantity INTEGER(25) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Samsung tablet", "Electronics", 200.99, 5),
("coding books", "Education", 200.99, 5),
("blankest", "Home", 200.99, 5),
("Samsung tablet", "Cosmetic", 200.99, 5),
("Samsung tablet", "body", 200.99, 5),
("Samsung tablet", "", 200.99, 5),
("Samsung tablet", "Electronics", 200.99, 5),
("Samsung tablet", "Electronics", 200.99, 5),
("Samsung tablet", "Electronics", 200.99, 5),
("Samsung tablet", "Electronics", 200.99, 5);


