'use strict';

require('dotenv').config();
const app= require('./src/server')
const {db}= require('./src/auth/models');
const port=3005

db.sync().then(()=>{

    app.start(port|| 3001)
})