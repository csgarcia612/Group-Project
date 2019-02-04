create table if not exists users (
user_id serial primary key,
auth0_id varchar not null,
username varchar(30),
first_name varchar(50),
last_name varchar(50),
email text,
image_url text
);

create table if not exists addresses (
address_id serial primary key,
user_id text,
address_one text,
address_two text,
city text,
state varchar(2),
zipcode integer
);

create table if not exists orders (
order_id serial primary key,
address_id text
);

create table if not exists line_items (
line_item_id serial primary key,
order_id integer,
item_name text,
item_price numeric(6,2),
quantity integer
);