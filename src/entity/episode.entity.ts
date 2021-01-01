// location.entity.ts
import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { RootEntity } from './root.entity';
import { CommentEntity } from './comment.entity';
import { CharacterEntity } from './character.entity';

@Entity({ name: 'episodes' })
export class EpisodeEntity extends RootEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'datetime' })
  releaseDate: string;

  @Column({ type: 'varchar' })
  episodeCode: string;

  @ManyToMany(() => CharacterEntity, (character) => character.episodes)
  characters: CharacterEntity[];

  @OneToMany((type) => CommentEntity, (comment) => comment.episode, {
    nullable: true,
  })
  comments: CommentEntity[];
}
