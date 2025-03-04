'use strict';

const base64 = require('base-64')
const {users}= require('../models/index');

module.exports= async(req, res,next)=>{

    if(!req.headers.authorization) return _authError()
    let basic = req.headers.authorization.split(' ').pop();
    let [user, pass]= base64.decode(basic).split(':');
    try {
        req.user= await users.authenticateBasic(user,pass);
        next()
        
    } catch (error) {
        _authError()
    }


    function _authError(){
        res.status(401).send('Invalid Login')
    }
}
