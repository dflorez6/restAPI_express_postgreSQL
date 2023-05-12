//====================
// ENV
//====================
// Fix for __dirname && __filename in ES6
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Import dotenv
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, './.env') })

//====================
// Import the dependencies
//====================
import cors from 'cors';
import express from 'express';

// Define my app
const app = express();

// Decode post information from the URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User CORS on all routes
app.use(cors());

//====================
// Models
//====================
import models, { sequelize } from './models/index.js';

// .use() - This method is part of Express Middleware, defines a layer that sits on top of all the other RESTful types
app.use(
    async (req, res, next) => {
        const authUserId = 'dflorez6';

        // TODO: Using req.context allows to pass the values to all the routes and then I can move the routes to other folders without breaking anything
        // You don't need necessarily the context object as a container, but I found it a good practice to keep 
        // everything that is passed to the routes at one place
        req.context = {
            models,
            me: await models.User.findByLogin(authUserId)
        };
        // To use req.context: 
        // e.g. to get all users -> req.context.models.users
        // e.g. to get authenticated user -> req.context.models.users[req.context.me.id]
        next();
    }
);

//====================
// Routes
//====================
// Modularization of Routes
import routes from './routes/index.js';
app.use('/session', routes.session)
app.use('/users', routes.user)
app.use('/messages', routes.message)

//====================
// Port
//====================
// If you don't want to re-initialize your database on every Express server start:
/*
sequelize.sync().then(() => {
    app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
    );    
});
*/

// Re-initialize your database on every Express server start
const eraseDatabaseOnSync = true;

// Connect to PostgreSQL DB
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    // Seeds DB
    if (eraseDatabaseOnSync) {
        createUserWithMessages();
    }

    // Start Express App
    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`),
    );
});

//====================
// DB Seeds
//====================
const createUserWithMessages = async () => {
    
    // Creates a User with an associated Message
    await models.User.create(
        {
            username: 'dflorez6',
            messages: [
                {
                    text: 'Published some important book!'
                },
            ],
        },
        {
            include: [models.Message]
        },
    );

    // Creates a User with associated Messages
    await models.User.create(
        {
            username: 'kanut',
            messages: [
                {
                    text: 'Happy to bark...'
                },
                {
                    text: 'And chase sheep!'
                },
            ],
        },
        {
            include: [models.Message]
        },
    );

};