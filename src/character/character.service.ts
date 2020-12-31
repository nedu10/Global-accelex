import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCharacterDto } from 'src/dto/create-character.dto';
import { CharacterEntity } from 'src/entity/character.entity';
import { CharacterEpisodeEntity } from 'src/entity/character_episode.entity';
import { EpisodeEntity } from 'src/entity/episode.entity';
import { LocationEntity } from 'src/entity/location.entity';
import { CharacterRepository } from 'src/repository/character.repository';
import { EpisodeRepository } from 'src/repository/episode.repository';
import { LocationRepository } from 'src/repository/location.repository';
import { Repository } from 'typeorm';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(CharacterRepository)
    private characterRepo: CharacterRepository,

    private readonly logger: Logger,

    @InjectRepository(CharacterEpisodeEntity)
    private characterEpisodeRepo: Repository<CharacterEpisodeEntity>,

    @InjectRepository(LocationRepository)
    private locationRepo: LocationRepository,

    @InjectRepository(EpisodeRepository)
    private episoderepo: EpisodeRepository,
  ) {}

  async create_character(
    create_character_dto: CreateCharacterDto,
  ): Promise<object> {
    try {
      let {
        firstName,
        lastName,
        status,
        stateOfOrigin,
        gender,
        location,
        episode,
      } = create_character_dto;

      const get_location = await this.get_location(location);

      const get_episode = await this.get_episode(episode);

      if (!get_location) {
        return {
          status_code: 500,
          status: 'error',
          message: 'Cant Find Location',
        };
      }

      if (!get_episode) {
        return {
          status_code: 500,
          status: 'error',
          message: 'Cant Find Episode',
        };
      }

      const new_character = new CharacterEntity();
      new_character.firstName = firstName;
      new_character.lastName = lastName;
      new_character.status = status;
      new_character.stateOfOrigin = stateOfOrigin;
      new_character.gender = gender;
      new_character.location = get_location;

      const save_character = await new_character.save();

      await this.create_character_episode(save_character, get_episode);

      return {
        status_code: 201,
        status: 'success',
        message: 'Character Successfully Created',
      };
    } catch (error) {
      this.logger.error('Create Character Service Failed ' + error);
      return {
        status_code: error.code || 500,
        status: 'error',
        message: error.message || 'System Error',
        error: error.stack || error,
      };
    }
  }

  async get_all_character(): Promise<object> {
    try {
      const all_characters = await this.characterRepo.find({
        join: [
          {
            alias: '',
          },
        ],
      });
      return {
        status_code: 200,
        status: 'success',
        message: 'Character Successfully Fetched',
        results: all_characters,
      };
    } catch (error) {
      this.logger.error('Get All Character Service Failed ' + error);
      return {
        status_code: error.code || 500,
        status: 'error',
        message: error.message || 'System Error',
        error: error.stack || error,
      };
    }
  }

  async get_location(location_id: number): Promise<LocationEntity> {
    return this.locationRepo.findOne(location_id);
  }

  async get_episode(episode_id: number): Promise<EpisodeEntity> {
    return this.episoderepo.findOne(episode_id);
  }

  async create_character_episode(
    character: CharacterEntity,
    episode: EpisodeEntity,
  ): Promise<CharacterEpisodeEntity> {
    let new_character_episode = new CharacterEpisodeEntity();
    new_character_episode.character = character;
    new_character_episode.episode = episode;
    return await new_character_episode.save();
  }
}
