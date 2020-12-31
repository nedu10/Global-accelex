import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterEpisodeEntity } from 'src/entity/character_episode.entity';
import { CharacterRepository } from 'src/repository/character.repository';
import { EpisodeRepository } from 'src/repository/episode.repository';
import { LocationRepository } from 'src/repository/location.repository';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CharacterRepository,
      CharacterEpisodeEntity,
      LocationRepository,
      EpisodeRepository,
    ]),
  ],
  controllers: [CharacterController],
  providers: [CharacterService, Logger],
})
export class CharacterModule {}
