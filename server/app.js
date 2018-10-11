var express = require('express');
var app = express();
var cors=require('cors')
require('dotenv').config()
const mongoose=require('mongoose')


const userRoutes=require('./router/user.js')
const eventRoutes=require('./router/event.js')

mongoose.connect(process.env.DBURL,{useNewUrlParser:true});

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use('/users',userRoutes)
app.use('/events', eventRoutes)

app.listen(3000,function(){
    console.log('listen at port 3000')
});
