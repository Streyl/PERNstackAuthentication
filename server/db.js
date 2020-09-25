const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "sasha260800",
    host: "localhost",
    port: 5432,
    database: "diploma1"
});


module.exports = pool;