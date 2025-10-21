const mysql = require('../lib/mysql-adapter');

module.exports = {
    handle: mysql,
    database: 'hiolabsDB',
    prefix: 'hiolabs_',
    charset: 'utf8mb4',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'F29A99E8-4E64-4728-813A-3725EDBAF376',
    dateStrings: true
};
