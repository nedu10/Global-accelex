import { CharacterEntity } from '../entity/character.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CharacterEntity)
export class CharacterRepository extends Repository<CharacterEntity> {}
