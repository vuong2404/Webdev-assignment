import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { Client } from 'pg';
import { Scores } from 'src/modules/scores/scores.model';
import { IDatabaseConfigAttributes } from './interfaces/dbConfig.interface';


async function ensureDatabaseExists(config: IDatabaseConfigAttributes) {
    const { database, username, password, host, port } = config;
    const client = new Client({
        user: username,
        password,
        host,
        port,
        database: 'postgres',
    });

    try {
        await client.connect();
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${database}'`);
        if (res.rowCount === 0) {
            console.log(`Database ${database} chưa tồn tại. Đang tạo mới...`);
            await client.query(`CREATE DATABASE "${database}"`);
        } else {
            console.log(`Database ${database} đã tồn tại.`);
        }
    } catch (error) {
        console.error("Lỗi khi kiểm tra hoặc tạo database:", error);
    } finally {
        await client.end();
    }
}
export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
            case DEVELOPMENT:
                config = databaseConfig.development;
                break;
            case TEST:
                config = databaseConfig.test;
                break;
            case PRODUCTION:
                config = databaseConfig.production;
                break;
            default:
                config = databaseConfig.development;
        }
        await ensureDatabaseExists(config);
        const sequelize = new Sequelize(config);
        sequelize.addModels([Scores]);
        // await sequelize.sync();
        return sequelize;
        
    },
}];