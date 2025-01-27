import mysql from 'mysql2';

const db = mysql.createPool({
    host: 'mysql-xitique.alwaysdata.net',
    user: 'xitique',
    password: 'Acossa@824018...84',
    database: 'xitique_cash',
});

export default db;
