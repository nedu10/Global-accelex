import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeormConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
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
