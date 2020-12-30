// character.entity.ts
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { RootEntity } from './base.entity';
import { LocationEntity } from './location.entity';
import { CharacterEpisodeEntity } from './character_episode.entity';

export enum CharacterStatus {
  ACTIVE = 'ACTIVE',
  DEAD = 'DEAD',
  UNKNOWN = 'UNKNOWN',
}

export enum CharacterGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

@Entity({ name: 'characters' })
export class CharacterEntity extends RootEntity {
  @Column({ type: 'varchar', length: 300 })
  firstName: string;

  @Column({ type: 'varchar', length: 300 })
  lastName: string;

  @Column({ type: 'enum', enum: CharacterStatus })
  status: CharacterStatus;

  @Column({ type: 'varchar', length: 300 })
  stateOfOrigin: string;

  @Column({ type: 'enum', enum: CharacterGender })
  gender: CharacterGender;

  @ManyToOne((type) => LocationEntity, (location) => location.characters, {
    eager: false,
    cascade: false,
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'location' })
  location: LocationEntity;

  @OneToMany(
    (type) => CharacterEpisodeEntity,
    (character_episode) => character_episode.character,
    {
      eager: false,
      nullable: true,
    },
  )
  episodes: CharacterEpisodeEntity[];
}
