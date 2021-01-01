// character.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RootEntity } from './root.entity';
import { EpisodeEntity } from './episode.entity';

@Entity({ name: 'comments' })
export class CommentEntity extends RootEntity {
  @Column({ type: 'varchar', length: 249 })
  comment: string;

  @Column({ type: 'varchar' })
  ipAddressLocation: string;

  @ManyToOne((type) => EpisodeEntity, (episode) => episode.comments, {
    cascade: false,
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'episode' })
  episode: EpisodeEntity;
}
