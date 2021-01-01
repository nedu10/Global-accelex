import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCharacterDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  stateOfOrigin: string;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  location: number;

  @ApiProperty()
  episode: number;
}
