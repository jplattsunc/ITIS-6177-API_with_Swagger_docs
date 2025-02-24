const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sample',
    port: 3306,
    connectionLimit: 5,
    acquireTimeout: 30000
});

async function testDB() {
    let conn;
    try {
        console.log('Connecting to the database...');
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM customer LIMIT 5');
        console.log('Database query result:', rows);
    } catch (err) {
        console.error('Database connection failed:', err);
    } finally {
        if (conn) conn.release();
    }
}

testDB();

