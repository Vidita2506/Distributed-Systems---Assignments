CREATE TABLE user_login (
    email varchar(128),
    password varchar(1024),
    user_type varchar(10)
);

CREATE TABLE buyer_profile (
    email varchar(128),
    name varchar(128),
    phone varchar(12),
    imagepath varchar(128)
 );
 
 CREATE TABLE food_items (
    name varchar(500),
    rest_name varchar(128),
    section varchar(20),
    price decimal(6,2)
 );
 
 CREATE TABLE rest_owner_profile (
    email varchar(128),
    name varchar(128),
    rest_name varchar(128),
    restzip varchar(10),
    cuisine varchar(60),
    rest_image_path varchar(128),
    owner_image_path varchar(128)
 );
 