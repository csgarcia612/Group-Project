const axios = require('axios')
module.exports = {
    getUsers: (db) => {
        return db.query('select * from users where user_id = 1')
    },
    createUser: (db, user) => {
        //id, name, email, age, favColor, picture, created_at
        return db.query("insert into users (auth0_id, username, first_name, last_name, email, image_url)values (${auth0_id}, ${username}, ${first_name}, ${last_name},${email}, ${image_url})returning *;",{
            
            auth0_id: user.auth0_id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            image_url: user.image_url
            
     
        })
    },
    updateUser: (db, user) => {
        return db.query("update users set username = ${username},first_name = ${first_name},last_name = ${last_name}, email = ${email},image_url = ${image_url} where user_id = 1 returning *;",{
    
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            image_url: user.image_url
    })
    },

    updateAddress: (db, address) => {
        return db.query("update addresses set address_one = ${address_one},address_two = ${address_two},city = ${city}, state = ${state},zipcode = ${zipcode} where address_id = 1 returning *;",{
    
            address_one: address.address_one,
            address_two: address.address_two,
            city: address.city,
            state: address.state,
            zipcode: address.zipcode
    })
    },

    getInternetData(){
        return axios.get('https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=eIMh2CGNhtUTSybN21TU3JRes1j9raV3&classificationName=[music]&size=20&sort=date,asc').then(res => {
            return res.data.results
        })
    },

    getAddress: (db) => {
        return db.query('select * from addresses where address_id = 1')
    },

    createAddress: (db, address) => {
        //id, name, email, age, favColor, picture, created_at
        return db.query("insert into addresses (address_one, address_two, city, state, zipcode)values (${address_one}, ${address_two}, ${city}, ${state},${zipcode})returning *;",{
            
            address_one: address.address_one,
            address_two: address.address_two,
            city: address.city,
            state: address.state,
            zipcode: address.zipcode
            
     
        })
    }



}