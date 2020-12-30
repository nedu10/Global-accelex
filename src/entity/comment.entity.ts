// character.entity.ts
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EpisodeEntity } from './episode.entity';

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 249 })
  comment: string;

  @Column({ type: 'varchar' })
  ipAddressLocation: string;

  @ManyToOne((type) => EpisodeEntity, (episode) => episode.comments, {
    eager: false,
    cascade: false,
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'episode' })
  episode: EpisodeEntity;
}
