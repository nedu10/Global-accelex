import { HttpService, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentEntity } from '../entity/comment.entity';
import { EpisodeEntity } from '../entity/episode.entity';
import { CommentRepository } from '../repository/comment.repository';
import { EpisodeRepository } from '../repository/episode.repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepo: CommentRepository,

    @InjectRepository(EpisodeRepository)
    private episodeRepo: EpisodeRepository,

    private logger: Logger,

    private readonly http: HttpService,
  ) {}

  async create_comment(create_comment_dto: CreateCommentDto): Promise<object> {
    try {
      const ipAddressLocation = await this.get_ipaddress();
      let { comment, episode_id } = create_comment_dto;

      const get_episode = await this.get_episode(Number(episode_id));

      if (!get_episode) {
        return {
          status_code: 500,
          status: 'error',
          message: 'Cant Find Episode',
        };
      }

      const new_comment = new CommentEntity();
      new_comment.comment = comment;
      new_comment.ipAddressLocation = ipAddressLocation;
      new_comment.episode = get_episode;

      console.log('rrtrt >>', get_episode.comments);

      get_episode.comments = [new_comment].concat(get_episode.comments);

      const save_comment = await new_comment.save();

      await get_episode.save();

      return {
        status_code: 201,
        status: 'success',
        message: 'Comment Successfully Created',
      };
    } catch (error) {
      this.logger.error('Create Comment Service Failed ' + error);
      console.log(error);

      return {
        status_code: error.code || 500,
        status: 'error',
        message: error.message || 'System Error',
        error: error.stack || error,
      };
    }
  }

  async get_comments(episode_id: number): Promise<object> {
    try {
      const all_comments = await this.commentRepo.find({
        where: { episode: episode_id },
        relations: ['episode'],
        order: {
          created_at: 'DESC',
        },
      });

      return {
        status_code: 200,
        status: 'success',
        message: 'Comments Successfully Fetched',
        results: all_comments,
      };
    } catch (error) {
      this.logger.error('Get All Comments Service Failed ' + error);
      return {
        status_code: error.code || 500,
        status: 'error',
        message: error.message || 'System Error',
        error: error.stack || error,
      };
    }
  }

  async single_comment(
    episode_id: number,
    comment_id: number,
  ): Promise<object> {
    try {
      const single_comments = await this.commentRepo.findOne(comment_id, {
        where: { episode: episode_id },
        relations: ['episode'],
      });

      return {
        status_code: 200,
        status: 'success',
        message: 'Comment Successfully Fetched',
        results: single_comments || {},
      };
    } catch (error) {
      this.logger.error('Get Single Comment Service Failed ' + error);
      return {
        status_code: error.code || 500,
        status: 'error',
        message: error.message || 'System Error',
        error: error.stack || error,
      };
    }
  }

  async get_episode(episode_id: number): Promise<EpisodeEntity> {
    return this.episodeRepo.findOne(episode_id, {
      relations: ['comments'],
    });
  }

  async get_ipaddress(): Promise<string> {
    const ip = await this.http
      .get(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=2f8acf9a14d34cd0a8648f2b9f9c6e09`,
      )
      .toPromise();

    console.log(ip.data);

    return ip.data ? ip.data.ip_address : '';
  }
}
