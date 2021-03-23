// pais.entity.ts
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';



// @Index(
// @Index(
//     ['nombre', 'apellido', 'cedula'],
//     {unique: true}
// )
@Entity() // nombre tabla usuario
export class PaisEntity {

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true
    })
    nombre?: string

    @Column({
        name: 'capital',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    capital?: string

    @Column({
        name: 'poblacion',
        type: 'varchar',
        length: '18'
    })
    poblacion: string;

    @Column({
        name: 'numeroEstaciones',
        type: 'varchar'

    })
    numeroEstaciones: string;

    @Column({
        name: 'fundacion',
        type: 'varchar'
    })
    fundacion: string;

}
