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
                            <>
                            <div className= 'user-image-container'>
                                <img src={data.user.image_url} />                        
                            </div>
                            <div className= 'user-info-container'>
                               <p>{data.user.username}</p> 
                                <p>{data.user.first_name}</p>
                                <p>{data.user.last_name}</p>
                                <p>{data.user.email}</p>
                                <p>{data.user.address.address_one}</p>
                                <p>{data.user.address.address_two}</p>
                                <p>{data.user.address.city}</p>
                                <p>{data.user.address.state}</p>
                                <p>{data.user.address.zipcode}</p>                                  
                            </div>
                        </>
                        )
                    }}
            
            </Query>
            </div>
        )
    }
}