import { HttpModule, Logger, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from '../repository/comment.repository';
import { EpisodeRepository } from '../repository/episode.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository, EpisodeRepository]),
    HttpModule.register({}),
  ],
  providers: [CommentService, Logger],
  controllers: [CommentController],
})
export class CommentModule {}
