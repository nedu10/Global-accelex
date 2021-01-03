import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeormConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.MYSQL_HOST || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.MYSQL_USER || dbConfig.username,
  password: process.env.MYSQL_PASS || dbConfig.password,
  database: process.env.MYSQL_DB || dbConfig.database,
  entities: ['dist/entity/**/*.entity{.ts,.js}'],
  migrations: ['dist/migration/**/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  cli: {
    migrationsDir: 'src/migration',
    entitiesDir: 'src/entity',
  },
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
  // autoLoadEntities: true,
};

export const typeormSeedConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.MYSQL_HOST || dbConfig.host,
  port: process.env.MYSQL_PORT || dbConfig.port,
  username: process.env.MYSQL_USER || dbConfig.username,
  password: process.env.MYSQL_PASS || dbConfig.password,
  database: process.env.MYSQL_DB || dbConfig.database,
  entities: ['src/entity/**/*.entity{.ts,.js}'],
  migrations: ['src/migration/**/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  cli: {
    migrationsDir: 'src/migration',
    entitiesDir: 'src/entity',
  },
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
  // autoLoadEntities: true,
};
