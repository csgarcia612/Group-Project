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
            order: Orders
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
            user(id: ID!): Users
            allAddresses: [Addresses]
            addresses(id: ID!): Addresses
            allOrders: [Orders]
            orders(id: ID!): Orders
            allLineItems: [LineItems]
            lineItems(id: ID!): LineItems
        }
        `
    ),

    root: {
        user: async ({id}) => {
            try{
                const db = index.database;
                const user = await db.get_user([id]).then(response => response[0])
                console.log('-----', user)
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

        // Users: async () => {
        //     try{
        //         const db = index.database
        //         const products = await db.get_all_products().then(response => response)
        //         products.forEach(products => products.category = {id: products.category_id, name: products.category_name, description: products.category_description}) // do this when you refer to another type that have an object in it
        //         console.log('products', products) 
        //         return products
        //     }catch(error){ 
        //         console.log('error in products', error)
        //         throw new Error(error.message)
        //     }
        
        // }, 
    }
}