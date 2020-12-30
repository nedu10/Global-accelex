import { EpisodeEntity } from 'src/entity/episode.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EpisodeEntity)
export class EpisodeRepository extends Repository<EpisodeEntity> {}
