insert into addresses 
(address_one, address_two, city, state, zipcode)
values (${address_one}, ${address_two}, ${city}, ${state},${zipcode})
returning *;

select u.user_id, u.auth0_id, u.username, u.first_name, u.last_name, u.email, u.image_url, a.address_one as address_one, a.address_two as address_two, a.city as address_city, a.state as address_state, a.zipcode as address_zipcode from users u 
join addresses a on u.user_id = a.user_id
where address_one = ${address_one};