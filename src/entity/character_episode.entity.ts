// location.entity.ts
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CharacterEntity } from './character.entity';
import { EpisodeEntity } from './episode.entity';

@Entity({ name: 'character_episodes' })
export class CharacterEpisodeEntity extends BaseEntity {
  @ManyToOne((type) => CharacterEntity, (character) => character.episodes, {
    eager: false,
    cascade: false,
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'character' })
  character: CharacterEntity;

  @ManyToOne((type) => EpisodeEntity, (episode) => episode.characters, {
    eager: false,
    cascade: false,
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'episode' })
  episode: EpisodeEntity;
}
