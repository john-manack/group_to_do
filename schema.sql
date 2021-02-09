CREATE TABLE user_info (
    id SERIAL PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    password varchar(2000) NOT NULL
);

CREATE TABLE to_do_list (
    id SERIAL PRIMARY KEY,
    is_complete boolean NOT NULL,
    content varchar(2000) NOT NULL,
    user_id_reference integer REFERENCES user_info (id)
);