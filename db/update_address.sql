update addresses
set user_id = ${user_id},
address_one = ${address_one},
address_two = ${address_two},
city = ${city},
state = ${state}
where auth0_id = ${auth0_id};