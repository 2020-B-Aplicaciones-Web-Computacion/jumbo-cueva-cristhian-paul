import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PisoEntity } from '../piso/piso.entity';
@Entity('edificio')
export class EdificioEntity{
  @PrimaryGeneratedColumn()
  id?:number;

  @Column({type:'varchar',length:60})
  nombre:string;

  @Column({type:'varchar'})
  direccion:string;

  @Column({type:'varchar', name:'telefono'})
  telefono:string

  @OneToMany(type =>PisoEntity, piso=>piso.edificio)
  piso:PisoEntity[];



}
