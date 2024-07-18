import fs from 'node:fs';
import path from 'node:path';
import {Sequelize, DataTypes, Model} from "sequelize";
import config from "../../config/config";
import {fileURLToPath} from 'node:url'

const cwd = process.cwd()
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const basename = path.basename(filename)
const env = process.env.NODE_ENV || 'development'
const db: IDb = {} as IDb;


const sequelize: Sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
    .readdirSync(dirname)
    .filter((file: string): boolean => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
    })
    .forEach((file: string): void => {
        const model = require(path.join(dirname, file))(sequelize, DataTypes)
        db[model.name] = model;
    })

Object.keys(db).forEach((modelName: string): void => {
    // @ts-ignore
    db[modelName].associate(db);
    // @ts-ignore
    db[modelName].sync({
        alter: env === 'development'
    }).then((): void => {
        console.log(`Table ${modelName} sync`)
    }).catch((error: unknown): void => {
        console.log(`Table ${modelName} not sync because : ${error}`)
    })
});

db.sequelize = sequelize
db.Sequelize = Sequelize

export interface IDb extends Record<string, any> {
    sequelize: typeof sequelize;
    Sequelize: typeof Sequelize;
}

export default db;