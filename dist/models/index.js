import fs from 'node:fs';
import path from 'node:path';
import { Sequelize, DataTypes } from "sequelize";
import config from "../config/config.js";
import { fileURLToPath } from 'node:url';
const cwd = process.cwd();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const basename = path.basename(filename);
const env = process.env.NODE_ENV || 'development';
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
fs
    .readdirSync(dirname)
    .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
})
    .forEach((file) => {
    const model = require(path.join(dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
    // @ts-ignore
    db[modelName].associate(db);
    // @ts-ignore
    db[modelName].sync({
        alter: env === 'development'
    }).then(() => {
        console.log(`Table ${modelName} sync`);
    }).catch((error) => {
        console.log(`Table ${modelName} not sync because : ${error}`);
    });
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
