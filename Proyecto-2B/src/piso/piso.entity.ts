import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EdificioEntity } from '../edificio/edificio.entity';

@Entity('piso')
export class PisoEntity{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({name:'descripcion',type:'varchar'})
  descripcion:string

  @Column({name:'nombre', type:'varchar'})
  nombre:string

  @Column({name:'n_departamentos',type:'int'})
  n_departamentos:number

  @Column({name:'pasillo', type:'varchar'})
  pasillo:string

  @ManyToOne(type => EdificioEntity, edificio=> edificio.piso)
  edificio: EdificioEntity | string | number;


}
