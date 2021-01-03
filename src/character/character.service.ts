import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCharacterDto } from '../dto/create-character.dto';
import { CharacterEntity, CharacterSort } from '../entity/character.entity';
import { EpisodeEntity } from '../entity/episode.entity';
import { LocationEntity } from '../entity/location.entity';
import { CharacterRepository } from '../repository/character.repository';
import { EpisodeRepository } from '../repository/episode.repository';
import { LocationRepository } from '../repository/location.repository';
import { Repository } from 'typeorm';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(CharacterRepository)
    private characterRepo: CharacterRepository,

    private readonly logger: Logger,

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
      new_character.episodes = [get_episode];

      const save_character = await new_character.save();

      get_episode.characters = [new_character];

      await get_episode.save();

      return {
        status_code: 201,
        status: 'success',
        message: 'Character Successfully Created',
      };
    } catch (error) {
      this.logger.error('Create Character Service Failed ' + error);
      console.log(error);

      return {
        status_code: error.code || 500,
        status: 'error',
        message: error.message || 'System Error',
        error: error.stack || error,
      };
    }
  }

  async get_all_character(
    sort_by: CharacterSort,
    desc: number,
  ): Promise<object> {
    try {
      let choose_character;

      if (sort_by == CharacterSort.gender) {
        choose_character = this.characterRepo.find({
          relations: ['location', 'episodes'],
          order: { gender: desc == 1 ? 'DESC' : 'ASC' },
        });
      } else if (sort_by == CharacterSort.name) {
        choose_character = this.characterRepo.find({
          relations: ['location', 'episodes'],
          order: { firstName: desc == 1 ? 'DESC' : 'ASC' },
        });
      } else {
        choose_character = this.characterRepo.find({
          relations: ['location', 'episodes'],
          order: { created_at: desc == 1 ? 'DESC' : 'ASC' },
        });
      }

      const all_characters = await choose_character;
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

  async get_single_character(character_id: number): Promise<object> {
    try {
      const single_characters = await this.characterRepo.findOne({
        relations: ['location', 'episodes'],
        where: { id: character_id },
      });
      return {
        status_code: 200,
        status: 'success',
        message: 'Character Successfully Fetched',
        results: single_characters || {},
      };
    } catch (error) {
      this.logger.error('Get Single Character Service Failed ' + error);
      return {
        status_code: error.code || 500,
        status: 'error',
        message: error.message || 'System Error',
        error: error.stack || error,
      };
    }
  }

  async add_episode_to_character(
    character_id: number,
    episode_id: number,
  ): Promise<object> {
    try {
      const get_episode = await this.get_episode(episode_id);
      if (!get_episode) {
        return {
          status_code: 500,
          status: 'error',
          message: 'Cant Find Episode',
        };
      }

      const get_character = await this.get_character(character_id);
      if (!get_character) {
        return {
          status_code: 500,
          status: 'error',
          message: 'Cant Find Character',
        };
      }

      get_character.episodes = [...get_character.episodes, get_episode];

      await get_character.save();
      return {
        status_code: 200,
        status: 'success',
        message: 'Successfully Added episode to Character',
      };
    } catch (error) {
      this.logger.error('Add Episode To Character Service Failed ' + error);
      return {
        status_code: error.code || 500,
        status: 'error',
        message: error.message || 'System Error',
        error: error.stack || error,
      };
    }
  }

  async remove_episode_to_character(
    character_id: number,
    episode_id: number,
  ): Promise<object> {
    try {
      const get_episode = await this.get_episode(episode_id);
      if (!get_episode) {
        return {
          status_code: 500,
          status: 'error',
          message: 'Cant Find Episode',
        };
      }

      const get_character = await this.get_character(character_id);
      if (!get_character) {
        return {
          status_code: 500,
          status: 'error',
          message: 'Cant Find Character',
        };
      }

      const new_element = [...get_character.episodes].filter((element) => {
        return element.id != get_episode.id;
      });

      get_character.episodes = new_element;

      await get_character.save();
      return {
        status_code: 200,
        status: 'success',
        message: 'Successfully Removed episode to Character',
      };
    } catch (error) {
      this.logger.error('Remove Episode To Character Service Failed ' + error);
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
    return this.episoderepo.findOne(episode_id, { relations: ['characters'] });
  }

  async get_character(character_id: number): Promise<CharacterEntity> {
    return this.characterRepo.findOne(character_id, {
      relations: ['episodes'],
    });
  }

  //   async create_character_episode(
  //     character: CharacterEntity,
  //     episode: EpisodeEntity,
  //   ): Promise<CharacterEpisodeEntity> {
  //     let new_character_episode = new CharacterEpisodeEntity();
  //     new_character_episode.character = character;
  //     new_character_episode.episode = episode;
  //     return await new_character_episode.save();
  //   }
}
