import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCharacterDto } from 'src/dto/create-character.dto';
import { CharacterSort } from 'src/entity/character.entity';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Post('create-character')
  @UsePipes(ValidationPipe)
  create_character(
    @Body() create_character_dto: CreateCharacterDto,
  ): Promise<object> {
    return this.characterService.create_character(create_character_dto);
  }

  @Get('/')
  get_all_character(
    @Query('sort_by') sort_by: CharacterSort,
    @Query('desc', ParseIntPipe) desc: number,
  ): Promise<object> {
    return this.characterService.get_all_character(sort_by, desc);
  }

  @Get(':character_id')
  get_single_character(
    @Param('character_id', ParseIntPipe) character_id: number,
  ): Promise<object> {
    return this.characterService.get_single_character(character_id);
  }

  @Get('add/:character_id/:episode_id')
  add_episode_to_character(
    @Param('character_id', ParseIntPipe) character_id: number,
    @Param('episode_id', ParseIntPipe) episode_id: number,
  ): Promise<object> {
    return this.characterService.add_episode_to_character(
      character_id,
      episode_id,
    );
  }

  @Get('remove/:character_id/:episode_id')
  remove_episode_to_character(
    @Param('character_id', ParseIntPipe) character_id: number,
    @Param('episode_id', ParseIntPipe) episode_id: number,
  ): Promise<object> {
    return this.characterService.remove_episode_to_character(
      character_id,
      episode_id,
    );
  }
}
