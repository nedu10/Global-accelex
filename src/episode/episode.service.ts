import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEpisodeDto } from 'src/dto/create-episode.dto';
import { EpisodeRepository } from 'src/repository/episode.repository';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectRepository(EpisodeRepository) private episodeRepo: EpisodeRepository,
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
      const all_episode = await this.episodeRepo.find();
      return {
        status_code: 200,
        status: 'success',
        message: 'Episode Successfully Fetched',
        results: all_episode,
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
      const single_episode = await this.episodeRepo.findOne(episode_id);
      return {
        status_code: 200,
        status: 'success',
        message: 'Episode Successfully Fetched',
        results: single_episode,
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
