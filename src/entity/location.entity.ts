// location.entity.ts
import { Entity, Column, OneToMany } from 'typeorm';
import { RootEntity } from './root.entity';
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
    nullable: true,
  })
  characters: CharacterEntity[];
}
