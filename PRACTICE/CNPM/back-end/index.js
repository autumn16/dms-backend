const express = require('express')
const app = express()

const port = process.env.PORT || 5000

const bcrypt = require('bcrypt')

const cors = require('cors')
app.use(cors())

// const rateLimit = require('express-rate-limit')
// const limiter = rateLimit({
//     windowMs: 60*15*1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//     message: "THE PAGE IS BLOCKING. PLEASE WAITING..."
// })

// app.use(limiter)

const mongoose = require('mongoose')

require('dotenv').config()
const URL = process.env.URL_DB
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('connected to Mongo DB')
})

const morgan = require('morgan') 
app.use(morgan('dev'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const visitorRoute = require('./routes/visitor.route')
const studentRoute = require('./routes/student.route')
const userRoute = require('./routes/user.router')
const dutyRoute = require('./routes/duty.route')
const serviceRoute = require('./routes/service.route')


app.set('view engine', 'pug')
app.set('views','./views')

// app.get('/',(req, res) => {
//     res.render('index', {
//         name: 'Nguyen Huu Hung'
//     });
// })

// CORS Headers => Required for cross-origin/cross-server communication
app.use((req, res, next) => {
    res.setHeader('Access-Control-Alow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.use('/visitor', visitorRoute)
app.use('/student', studentRoute)
app.use('/user', userRoute)
app.use('/duty', dutyRoute)
app.use('/service', serviceRoute)

app.listen(port, () => console.log(`Server running at port ${port}`))
