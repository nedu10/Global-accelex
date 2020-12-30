// location.entity.ts
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { RootEntity } from './base.entity';
import { CharacterEntity } from './character.entity';

@Entity({ name: 'locations' })
export class LocationEntity extends RootEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'double' })
  latitude: number;

  @Column({ type: 'double' })
  longitude: number;

  @OneToMany((type) => CharacterEntity, (character) => character.location, {
    eager: false,
    nullable: true,
  })
  characters: CharacterEntity[];
}
