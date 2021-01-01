// character.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { RootEntity } from './root.entity';
import { LocationEntity } from './location.entity';
import { EpisodeEntity } from './episode.entity';

export enum CharacterStatus {
  ACTIVE = 'ACTIVE',
  DEAD = 'DEAD',
  UNKNOWN = 'UNKNOWN',
}

export enum CharacterGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum CharacterSort {
  name = 'name',
  gender = 'gender',
}

@Entity({ name: 'characters' })
export class CharacterEntity extends RootEntity {
  @Column({ type: 'varchar', length: 300 })
  firstName: string;

  @Column({ type: 'varchar', length: 300 })
  lastName: string;

  @Column({ type: 'enum', enum: CharacterStatus })
  status: string;

  @Column({ type: 'varchar', length: 300 })
  stateOfOrigin: string;

  @Column({ type: 'enum', enum: CharacterGender })
  gender: string;

  @ManyToOne((type) => LocationEntity, (location) => location.characters, {
    cascade: false,
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'location' })
  location: LocationEntity;

  @ManyToMany(() => EpisodeEntity, (episode) => episode.characters)
  @JoinTable()
  episodes: EpisodeEntity[];
}
