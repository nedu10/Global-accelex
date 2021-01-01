import { Injectable, Logger } from '@nestjs/common';
import { LocationSeederService } from './services/location-seeder.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly locationSeederService: LocationSeederService,
  ) {}
  async seed() {
    await this.location()
      .then((completed) => {
        this.logger.debug('Successfully completed seeding location...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding location...');
        Promise.reject(error);
      });
  }
  async location() {
    return await Promise.all(this.locationSeederService.create())
      .then((createdLocation) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of location created : ' +
            // Remove all null values and return only created languages.
            createdLocation.filter(
              (nullValueOrCreatedLocation) => nullValueOrCreatedLocation,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
