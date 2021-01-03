import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEpisodeDto } from '../dto/create-episode.dto';
import { CharacterRepository } from '../repository/character.repository';
import { EpisodeRepository } from '../repository/episode.repository';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectRepository(EpisodeRepository) private episodeRepo: EpisodeRepository,

    @InjectRepository(CharacterRepository)
    private characterRepo: CharacterRepository,

    private readonly logger: Logger,
  ) {}

  async create_episode(create_episode_dto: CreateEpisodeDto): Promise<object> {
    try {
      let episodeCode = this.generateCode(10);
      let episodata = { ...create_episode_dto, episodeCode };
      await this.episodeRepo.createNew(episodata);
      return {
        status_code: 201,
        status: 'success',
        message: 'Episode Successfully Created',
      };
    } catch (error) {
      this.logger.error('Create Episode Service Failed ' + error);
      return {
        status_code: error.code || 500,
        status: 'error',
        message: error.message || 'System Error',
        error: error.stack || error,
      };
    }
  }

  async get_all_episode(): Promise<object> {
    try {
      const all_episode = await this.episodeRepo.find({
        relations: ['characters', 'comments'],
        order: {
          releaseDate: 'DESC',
        },
      });
      let new_data = [];
      all_episode.forEach((each_episode) => {
        new_data.push({
          ...each_episode,
          comments_count: each_episode.comments
            ? each_episode.comments.length
            : 0,
        });
      });

      return {
        status_code: 200,
        status: 'success',
        message: 'Episode Successfully Fetched',
        results: new_data,
      };
    } catch (error) {
      this.logger.error('Get All Episode Service Failed ' + error);
      return {
        status_code: error.code || 500,
        status: 'error',
        message: error.message || 'System Error',
        error: error.stack || error,
      };
    }
  }

  async get_character_episode(character_id: number): Promise<object> {
    try {
      const all_character = await this.characterRepo.findOne(character_id, {
        relations: ['episodes'],
      });

      if (!all_character) {
        return {
          status_code: 200,
          status: 'success',
          message: 'Character does not exist',
        };
      }

      return {
        status_code: 200,
        status: 'success',
        message: 'Episode Successfully Fetched',
        results: all_character.episodes,
      };
    } catch (error) {
      this.logger.error('Get All Episode Service Failed ' + error);
      return {
        status_code: error.code || 500,
        status: 'error',
        message: error.message || 'System Error',
        error: error.stack || error,
      };
    }
  }

  async get_single_episode(episode_id: number): Promise<object> {
    try {
      const single_episode = await this.episodeRepo.findOne(episode_id, {
        relations: ['characters', 'comments'],
      });
      return {
        status_code: 200,
        status: 'success',
        message: 'Episode Successfully Fetched',
        results: single_episode || {},
      };
    } catch (error) {
      this.logger.error('Get Single Episode Service Failed ' + error);
      return {
        status_code: error.code || 500,
        status: 'error',
        message: error.message || 'System Error',
        error: error.stack || error,
      };
    }
  }

  // Generate a random Code of any length
  generateCode(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
