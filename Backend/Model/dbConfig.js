let pg = require('pg');
let connection = new pg.Client({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'todolist',
    port: '5432'
})

connection.connect((err,result)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("db connected")
    }
})
module.exports = connection
