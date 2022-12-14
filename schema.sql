DROP DATABASE IF EXISTS employ_db;

CREATE DATABASE employ_db;

USE employ_db;
CREATE TABLE department (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
name VARCHAR (30)
);

CREATE TABLE roles (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
title VARCHAR (30),
salary DECIMAL,
department_name VARCHAR (30)
);

CREATE TABLE employee (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
first_name VARCHAR (30),
last_name VARCHAR (30),
role_name VARCHAR (30),
manager_name VARCHAR (30)
);