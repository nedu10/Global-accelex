// location.entity.ts
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CharacterEpisodeEntity } from './character_episode.entity';
import { CommentEntity } from './comment.entity';

@Entity({ name: 'episodes' })
export class EpisodeEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'datetime' })
  releaseDate: string;

  @Column({ type: 'varchar' })
  episodeCode: string;

  @OneToMany(
    (type) => CharacterEpisodeEntity,
    (character_episode) => character_episode.episode,
    {
      eager: false,
      nullable: true,
    },
  )
  characters: CharacterEpisodeEntity[];

  @OneToMany((type) => CommentEntity, (comment) => comment.episode, {
    eager: false,
    nullable: true,
  })
  comments: CommentEntity[];
}