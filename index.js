const { Google_Authentication, Check_Details,main } = require('./controller/route')
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')

const session = require('express-session');


dotenv.config()

const app = express()
const port = process.env.PORT || 3000



app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SECRET_KEY, // Replace with a strong, random secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.post('/auth/google/callback', Google_Authentication);

app.get('/home', Check_Details);

app.get('/', main)

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})
