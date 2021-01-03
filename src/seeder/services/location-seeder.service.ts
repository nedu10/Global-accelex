import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from 'src/entity/location.entity';
import { LocationRepository } from 'src/repository/location.repository';

/**
 * Service dealing with user-role based operations.
 *
 * @class
 */
@Injectable()
export class LocationSeederService {
  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Repository<LocationEntity>} LocationRepository
   */
  location_data: object[] = [
    { name: 'brazil', longitude: 14.235, latitude: 51.9253 },
    { name: 'Nigeria', longitude: 24.235, latitude: 71.9253 },
    { name: 'India', longitude: 90.235, latitude: 6.9253 },
    { name: 'Cameroon', longitude: 39.235, latitude: 12.9253 },
    { name: 'Ghana', longitude: 17.235, latitude: 55.9253 },
    { name: 'England', longitude: 2.235, latitude: 7.9253 },
  ];
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: LocationRepository,
  ) {}
  /**
   * Seed all user role.
   *
   * @function
   */
  create(): Array<Promise<LocationEntity>> {
    const cleardb = async () => {
      await this.locationRepository.delete({});
    };
    cleardb();
    return this.location_data.map(
      async (each_location: {
        name: string;
        longitude: number;
        latitude: number;
      }) => {
        try {
          const dbUserRole = await this.locationRepository.findOne({
            name: each_location.name,
            longitude: each_location.longitude,
            latitude: each_location.latitude,
          });

          // We check if a language already exists.
          // If it does don't create a new one.
          if (dbUserRole) {
            return Promise.resolve(null);
          }
          let new_location = new LocationEntity();
          new_location.name = each_location.name;
          new_location.longitude = each_location.longitude;
          new_location.latitude = each_location.latitude;
          return Promise.resolve(await new_location.save());
        } catch (error) {
          return Promise.reject(error);
        }
      },
    );
  }
}
