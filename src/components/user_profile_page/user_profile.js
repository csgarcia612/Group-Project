import React, { Component } from 'react';
import {GET_USER} from './graphqlController';
import {Query} from 'react-apollo';
// import gql from 'graphql-tag';
import {connect} from 'react-redux';
import {setUser} from '../../dux/reducer'



class UserProfile extends Component{
    state = {
        users: []
    }

    render(){
        const userId = this.props.user&& this.props.user.auth0_id
        console.log('userID', userId);
        
        const getUser = (auth0_id) => (<Query query={GET_USER} variables={{auth0_id}}>
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
            
            
            </Query>)
                      
            
        return (
            
            <div className= 'user-profile-container'>
                {getUser(userId)}
                
            </div>
        )
    }
}
const mapStateToProp = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProp, {setUser})(UserProfile); 