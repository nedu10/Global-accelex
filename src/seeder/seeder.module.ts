import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormSeedConfig } from 'src/config/typeorm.config';
import { LocationEntity } from 'src/entity/location.entity';
import { Seeder } from './seeder';
import { LocationSeederService } from './services/location-seeder.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormSeedConfig),
    TypeOrmModule.forFeature([LocationEntity]),
  ],
  providers: [Logger, LocationSeederService, Seeder],
})
export class SeederModule {}
