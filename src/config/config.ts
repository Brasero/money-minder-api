import {Dialect} from "sequelize";

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined
export default {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DBNAME || 'money_minder_development',
  host: process.env.DB_HOST || '127.0.0.1',
  port: port || 3000,
  dialect: "mysql" as Dialect,
  logging: false,
  env: process.env.ENVIRONMENT || 'development',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}