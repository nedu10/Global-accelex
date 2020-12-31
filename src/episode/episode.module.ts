import { Logger, Module } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeRepository } from 'src/repository/episode.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EpisodeRepository])],
  providers: [EpisodeService, Logger],
  controllers: [EpisodeController],
})
export class EpisodeModule {}
