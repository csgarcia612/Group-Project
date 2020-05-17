const massive = require('massive');
require('dotenv').config();

let dbPromise;

module.exports = {
    testDB(){
        dbPromise = dbPromise || massive (process.env.TEST_CONNECTION_STRING);
        return dbPromise
    }
}