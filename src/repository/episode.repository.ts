import { CreateEpisodeDto } from '../dto/create-episode.dto';
import { EpisodeEntity } from '../entity/episode.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EpisodeEntity)
export class EpisodeRepository extends Repository<EpisodeEntity> {
  async createNew(create_episode_dto): Promise<object> {
    const { name, releaseDate, episodeCode } = create_episode_dto;
    const new_episode = new EpisodeEntity();
    new_episode.name = name;
    new_episode.releaseDate = releaseDate;
    new_episode.episodeCode = episodeCode.toUpperCase();
    return await new_episode.save();
  }
}
