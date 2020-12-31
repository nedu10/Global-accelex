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
import { CreateCharacterDto } from 'src/dto/create-character.dto';
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

  @Get('')
  get_all_character(): Promise<object> {
    return this.characterService.get_all_character();
  }

  @Get(':character_id')
  get_single_character(
    @Param('character_id', ParseIntPipe) character_id: number,
  ): Promise<object> {
    return this.characterService.get_single_character(character_id);
  }
}
