select a.address_id, a.user_id, a.address_one, a.address_two, a.city, a.state, a.zipcode, c.user_id as user_id_user_id, c.auth0_id as user_id_auth0_id, c.email as user_id_email from addresses a 
join users c on a.user_id = c.user_id 
where a.address_id =$1