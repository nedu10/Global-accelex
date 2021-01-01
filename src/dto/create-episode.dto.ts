import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEpisodeDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  releaseDate: string;
}
