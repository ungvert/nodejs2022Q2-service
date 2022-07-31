import { DataSource } from 'typeorm';
import 'dotenv/config';

export const postgresMigrationsDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: +process.env.DATABASE_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  logging: true,
});
