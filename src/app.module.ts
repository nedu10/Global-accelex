import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { CharacterModule } from './character/character.module';
import { SeederModule } from './seeder/seeder.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), CharacterModule, SeederModule, LocationModule],
  providers: [AppService],
})
export class AppModule {}
