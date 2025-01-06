'use strict';

const express= require('express')
const cors= require('cors')


const app= express();
app.use(express.json())

const handel404 = require ('./auth/handlers/404')
const handel500= require('./auth/handlers/500')

app.get('/home', (req, res)=>{
    res.send("Home page")
    
})

app.use(handel404)
app.use(handel500)

module.exports={
    app,
    start: (port)=>{
        app.listen(port,()=>{
        console.log(`Server up on ${port}`)
    })

}
}
