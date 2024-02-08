const express = require('express')
const path = require('path')
const app = express();

app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))

const userRoutes = require('./routes/user')
app.use('/static',express.static(path.join(__dirname,'public')))

app.use(userRoutes)

app.listen(3000,() => {
  console.log('listening on port 3000')
})