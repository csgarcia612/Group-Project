const express = require('express'),
	bodyParser = require("body-parser"),
	session = require("express-session"),
	massive = require("massive"),
	app = express(),
	RedisStore = require("connect-redis")(session),
	authController = require("./controller/Auth0_controller"),
	dotenv = require("dotenv"),
	cors = require("cors"),
	graphqlHTTP = require('express-graphql'),
	gqlConfigs = require('./graphql/graphqlConfigs');
dotenv.config();

app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
	.then(db => {
		// app.set("db", db);
		exports.database = db
		console.log('COnnected to database!')
	})
	.catch(error => console.log(("error in connecting to db", error)));
	app.use(cors())
	app.use('/graphiql', graphqlHTTP({
		schema: gqlConfigs.schema,
		rootValue: gqlConfigs.root,
		graphiql: true  
	}))
app.use(
	session({
		store: new RedisStore({ url: process.env.REDIS_URI }),
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 * 2 }
	})
);

app.get("/api/user-data", (req, res) => {
	// console.log(req);
	res.json({ user: req.session.user });
});

app.post("/api/logout", (req, res) => {
	req.session.destroy();
	res.send("Logged Out Successfully");
});

app.get("/auth/callback", authController.login);
app.post('/nodemailer', nodemailer.send)
// app.get("/auth/user-data", authController.getUser);
// app.post("/auth/logout", authController.logout);

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
