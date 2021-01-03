import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocationDto } from '../dto/create-location.dto';
import { LocationEntity } from '../entity/location.entity';
import { LocationRepository } from '../repository/location.repository';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationRepository)
    private locationRepo: LocationRepository,

    private readonly logger: Logger,
  ) {}

  async create_location(
    create_location_dto: CreateLocationDto,
  ): Promise<object> {
    try {
      let { name, latitude, longitude } = create_location_dto;

      const new_location = new LocationEntity();
      new_location.name = name;
      new_location.latitude = latitude;
      new_location.longitude = longitude;

      await new_location.save();

      return {
        status_code: 201,
        status: 'success',
        message: 'Location Successfully Created',
      };
    } catch (error) {
      this.logger.error('Create Location Service Failed ' + error);
      console.log(error);

      return {
        status_code: error.code || 500,
        status: 'error',
        message: error.message || 'System Error',
        error: error.stack || error,
      };
    }
  }
}
