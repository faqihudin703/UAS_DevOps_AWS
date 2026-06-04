import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER     || 'userwebdinamis_2388010020',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'dbcompro_2388010020',
  waitForConnections: true,
  connectionLimit: 10,
})

export default pool
