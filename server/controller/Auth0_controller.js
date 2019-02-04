const axios = require('axios')

module.exports = {
    login: (req, res) => {
        const {code} = req.query;
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
            return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${res.data.access_token}`)
            
        };

        function storeUserInfo(response) {
            console.log('user info', response.data);
            const user = response.data;
            const db = req.app.get('db')
            return db.get_user([user.sub]).then(newUses => {
                
                
                if(newUser.length){
                    
                    
                    req.session.user = {
                        
                        auth0_id: newUser[0].auth0_id,
                        username: newUser[0].username,
                        first_name: newUser[0].first_name,
                        last_name: newUser[0].last_name,
                        email: newUser[0].email,
                        image_url: newUser[0].image_url,

                        
                    };
                     res.redirect('/')
                
                }else {
                    console.log('create new user');
                    
                    return db.create_user([
                        user.sub,
                        user.username,
                        user.first_name,
                        user.last_name,
                        user.email,
                        user.image_url,
                    ]).then(newlyCreateUser => {
                        req.session.user = newlyCreateUser[0];
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
