import gql from 'graphql-tag';

export const GET_USER = gql` 
query getUser($auth0_id: String) {
    user(auth0_id: $auth0_id) {
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