import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('usuario')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column(
        {
            type: 'varchar',
            length: 100,
            nullable: false,
            name:'nombre'
        }
    )
    nombre: string

}