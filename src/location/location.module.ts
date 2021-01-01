import { Logger, Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationRepository } from 'src/repository/location.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LocationRepository])],
  providers: [LocationService, Logger],
  controllers: [LocationController],
})
export class LocationModule {}
