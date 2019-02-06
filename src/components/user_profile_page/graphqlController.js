import gql from 'graphql-tag';

export const GET_USER = gql` 
query getUser {
    user(id: 1) {
      username
      first_name
      last_name
      email
      image_url
      address{
        address_one
        address_two
        city
        state
        zipcode
      }
      
    }
  }`