insert into addresses 
(user_id, address_one, address_two, city, state, zipcode)
values ($1, $2, $3, $4,$5, $6)
returning *;