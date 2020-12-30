import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), CharacterModule],
  providers: [AppService],
})
export class AppModule {}
