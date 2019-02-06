import React, { Component } from 'react';
import {GET_USER} from './graphqlController';
import {Query} from 'react-apollo';

export default class UserProfile extends Component{
    state = {
        users: []
    }

    render(){
        return (
            <div className= 'user-profile-container'>
            <Query query={GET_USER}>
            {({ loading, error, data }) => {
                        if(loading) return <h1>Loading data...</h1>
                        if(error) return <h1>Error!</h1>
                        console.log('data', data)
                        return (
                            <div>
                                {data.user.username}
                                {data.user.first_name}
                                {data.user.last_name}
                                {data.user.email}
                                {data.user.image_url}
                                {data.user.address.address_one}
                                {data.user.address.address_two}
                                {data.user.address.city}
                                {data.user.address.state}
                                {data.user.address.zipcode}
                            </div>
                        )
                    }}
            
            </Query>
            </div>
        )
    }
}