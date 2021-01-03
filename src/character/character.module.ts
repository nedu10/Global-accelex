import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterRepository } from '../repository/character.repository';
import { EpisodeRepository } from '../repository/episode.repository';
import { LocationRepository } from '../repository/location.repository';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CharacterRepository,
      LocationRepository,
      EpisodeRepository,
    ]),
  ],
  controllers: [CharacterController],
  providers: [CharacterService, Logger],
})
export class CharacterModule {}
