import { IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  status: string;

  stateOfOrigin: string;

  @IsString()
  gender: string;

  location: number;

  episode: number;
}
