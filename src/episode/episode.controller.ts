import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEpisodeDto } from '../dto/create-episode.dto';
import { EpisodeService } from './episode.service';

@Controller('episode')
export class EpisodeController {
  constructor(private episodeService: EpisodeService) {}

  @Post('create-episode')
  @UsePipes(ValidationPipe)
  create_episode(
    @Body() create_episode_dto: CreateEpisodeDto,
  ): Promise<object> {
    return this.episodeService.create_episode(create_episode_dto);
  }

  @Get('')
  get_all_episode(): Promise<object> {
    return this.episodeService.get_all_episode();
  }

  @Get(':episode_id')
  get_single_episode(
    @Param('episode_id', ParseIntPipe) episode_id: number,
  ): Promise<object> {
    return this.episodeService.get_single_episode(episode_id);
  }

  @Get('/character/:character_id')
  get_character_episode(
    @Param('character_id', ParseIntPipe) character_id: number,
  ): Promise<object> {
    return this.episodeService.get_character_episode(character_id);
  }
}
