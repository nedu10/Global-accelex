import { LocationEntity } from 'src/entity/location.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(LocationEntity)
export class LocationRepository extends Repository<LocationEntity> {}
