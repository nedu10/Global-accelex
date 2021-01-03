import { Logger, Module } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeRepository } from '../repository/episode.repository';
import { CharacterRepository } from '../repository/character.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EpisodeRepository, CharacterRepository])],
  providers: [EpisodeService, Logger],
  controllers: [EpisodeController],
})
export class EpisodeModule {}
