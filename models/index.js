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
// TODO: Since this file is one level deepr in the folder structure THIS CHANGED TO '../.env' TWO .. to make it work
dotenv.config({ path: path.resolve(__dirname, '../.env') }) 

//====================
// Data Models
//====================
// Import the dependencies
import Sequelize from 'sequelize';
import getUserModel from './user.js';
import getMessageModel from './message.js';

// Create a Sequelize instance by passing mandatory arguments (database name, database superuser, 
// database superuser's password and additional configuration) to the constructor
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        dialect: 'postgres'
    }
);

// console.log(sequelize);

// Import and combine models and resolve their associations using the Sequelize API
const models = {
    User: getUserModel(sequelize, Sequelize),
    Message: getMessageModel(sequelize, Sequelize)
}

Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

// Export
export { sequelize };
export default models;