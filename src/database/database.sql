create database dbjs;

create table users(
	id serial primary key,
	name varchar(40),
	email text
);

insert into users (name, email) values
('jose', 'j@j.j'),
('andres', 'a@a.a');