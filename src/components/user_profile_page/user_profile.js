import React, { Component } from 'react';
import {GET_USER, DELETE_ADDRESS} from './graphqlController';
import {Query, Mutation} from 'react-apollo';
import {connect} from 'react-redux';
import {setUser} from '../../dux/reducer'



class UserProfile extends Component{
    state = {
        users: [],
        editing: false,
        address_one: this.props.address_one,
        address_two: this.props.address_two,
        city: this.props.city,
        state: this.props.state,
        zipcode: this.props.zipcode
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const {editing} = this.state;
        const {address_id, address_one, address_two, city, state, zipcode} = this.props;


        const userId = this.props.user && this.props.user.auth0_id
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
                                {(data.user.address) &&
                                    <>
                                    <p>{data.user.address.address_one}</p>
                                    <p>{data.user.address.address_two}</p>
                                    <p>{data.user.address.city}</p>
                                    <p>{data.user.address.state}</p>
                                    <p>{data.user.address.zipcode}</p>
                                    </>
                                } 
                                                                  
                            </div>
                        </>
                        )
                    }}
            
            
            </Query>)
                      
            
        return (
            
            <div className= 'user-profile-container'>
                {getUser(userId)}
             <div className='address-info'>
             {editing?
            <React.Fragment>
                <input type='text' name='address_one' value={this.state.address_one} onChange={(e) => this.handleInput(e)}/>
                <input type='text' name='address_two' value={this.state.address_two} onChange={(e) => this.handleInput(e)}/>
                <input type='text' name='address_city' value={this.state.address_city} onChange={(e) => this.handleInput(e)}/>
                <input type='text' name='address_state' value={this.state.address_state} onChange={(e) => this.handleInput(e)}/>
                <input type='number' name='address_zipcode' value={this.state.address_zipcode} onChange={(e) => this.handleInput(e)}/>
            </React.Fragment> 
            :
            <React.Fragment>
                
            </React.Fragment>
            }
             </div>
             {!editing && 
                <React.Fragment>
                    <button onClick={() => this.setState({editing: true})}>Edit</button>
                    <Mutation
                        mutation={DELETE_ADDRESS}
                        refetchQueries={[{query: GET_USER}]}>
                            {(deleteAddress) => (
                                <button onClick={() => {deleteAddress(
                                    {variables: {address_id}}
                                )
                                }}>Delete</button>
                            )}
                                
                                
                    </Mutation>

                </React.Fragment>
            }  
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