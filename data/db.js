const mysql = require('mysql2')
const config = require('../config')

let connection = mysql.createConnection(config.db)

connection.connect((err) => {
  if(err){
    return console.log(err)
  }
  console.log('connected to server')
})
module.exports = connection.promise()