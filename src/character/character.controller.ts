import {
  Body,
  Controller,
  Get,
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
}
