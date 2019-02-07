const {buildASTSchema} = require('graphql'),
    gql = require('graphql-tag'),
    index = require('../index');


module.exports = {
    schema: buildASTSchema(
        gql`
        type Users {
            user_id: ID
            auth0_id: String
            username: String
            first_name: String
            last_name: String
            email: String
            image_url: String
            address: Addresses
        }

        type Addresses {
            address_id: ID
            user_id: Users
            address_one: String
            address_two: String
            city: String
            state: String
            zipcode: Int
        }

        type Orders {
            order_id: ID
            addressId: Addresses
            itemName: String
            itemPrice: Float
            quantity: Int

        }

        type LineItems {
            lineItemId: ID
            orderId: Orders
        }

        type Query {
            users: [Users]
            user(auth0_id: String): Users
            allAddresses: [Addresses]
            addresses(id: ID!): Addresses
            allOrders: [Orders]
            orders(id: ID!): Orders
            allLineItems: [LineItems]
            lineItems(id: ID!): LineItems
        }

        type Mutation {
            userUpdate(input: updateUser!): Users
            addressUpdate(input: updateAddress!): Addresses
            
        }

        input updateUser {
            user_id: ID
            username: String!
            first_name: String!
            last_name: String!
            email: String!
            image_url: String!
        }

        input updateAddress {
            address_id: ID
            address_one: String!
            address_two: String!
            city: String!
            state: String!
            zipcode: Int!
        }
        `
    ),

    root: {
        user: async ({auth0_id}) => {
            try{
                const db = index.database;
                // console.log('==========', user_id)
                const user = await db.get_user_profile([auth0_id]).then(response => response[0])
                // console.log('-----', user)
                user.address = {
                        address_one: user.address_one,
                        address_two: user.address_two,
                        city: user.address_city, 
                        state: user.address_state,
                        zipcode: user.address_zipcode

                    }
                
                return user
            }catch(error ){ 
                console.log('error in user', error)
                throw new Error(error.message)
            }
        },
        userUpdate: async ({input: {user_id, username, first_name, last_name, email, image_url}}) => {
            try{
                const db = index.database
                const user = await db.update_user({user_id, username, first_name, last_name, email, image_url}).then(response => response[0])
                
                    user.address = {
                        address_one: user.address_one,
                        address_two: user.address_two,
                        city: user.address_city, 
                        state: user.address_state,
                        zipcode: user.address_zipcode
                }
                return user
            
            }catch(error){ 
            console.log('error in submitProduct', error)
            throw new Error(error.message)
            }
        },

        addressUpdate: async ({input: {address_id, address_one, address_two, city, state, zipcode}}) => {
            try{
                const db = index.database
                if(address_id){const user = await db.update_address({address_id, address_one, address_two, city, state, zipcode}).then(response => response[0])
                console.log('address update user', user);
                
                    user.address = {
                        address_one: user.address_one,
                        address_two: user.address_two,
                        city: user.address_city, 
                        state: user.address_state,
                        zipcode: user.address_zipcode
                }
                return user
            }else {
                const user = await db.create_address({address_id, address_one, address_two, city, state, zipcode}).then(response => response[0])
                
                    user.address = {
                        address_one: user.address_one,
                        address_two: user.address_two,
                        city: user.address_city, 
                        state: user.address_state,
                        zipcode: user.address_zipcode
                }
                return user
            }
            
            }catch(error){ 
            console.log('error in updateAddress', error)
            throw new Error(error.message)
            }
        }
    }
}