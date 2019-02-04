const axios = require('axios')

module.exports = {
    login: (req, res) => {
        const payload = {
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: `http://${req.headers.host}/auth/callback`
        };

        function codeForAccessToken(){
            console.log('codeforaccesstoken' );
            
            return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
        };

        function accessTokenForUserInfo(res) {
            console.log('accessTokenFOrUserInfo', res.data.access_token)
            return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${res.data.access_token}`)
            
        };

        function storeUserInfo(response) {
            console.log('user info', response.data);
            const user = response.data;
            const db = req.app.get('db')
            return db.get_user([user.sub]).then(newUsers => {
                
                
                if(newUsers.length){
                    
                    
                    req.session.user = {
                        profile_name: newUsers[0].profile_name,
                        email: newUsers[0].email,
                        picture: newUsers[0].picture,
                        auth0_id: newUsers[0].auth0_id,
                        admin: newUsers[0].admin

                        
                    };
                    //  res.redirect('/')
                
                }else {
                    console.log('create new user');
                    
                    return db.create_user([
                        user.sub,
                        user.email,
                        user.profile_name,
                        user.picture
                    ]).then(newlyCreateUsers => {
                        req.session.user = newlyCreateUsers[0];
                        res.redirect('/shop')
                    }).catch(error => {console.log(('error in create newly user', error));
                    });
                }

            })
            
        }

        codeForAccessToken()
        .then(accessTokenForUserInfo)
        .then(storeUserInfo)
        .catch(error => {
            console.log('error in login route', error);
            res.status(500).send('something went wrong on the server.')
            
        });
    },
    }
}