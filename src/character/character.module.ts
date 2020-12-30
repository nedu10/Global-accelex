import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterRepository } from 'src/repository/character.repository';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterRepository])],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
