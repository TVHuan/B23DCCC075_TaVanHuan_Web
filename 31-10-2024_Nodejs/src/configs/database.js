const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'tavanhuan19062005',
    database: 'todolist_app'
});

db.connect((err) =>{
    if(err){
        console.error(' Database conection failed:', err, stack);
        return;
    }
    console.log('Conected to Mysql database.');
});

module.exports = db;