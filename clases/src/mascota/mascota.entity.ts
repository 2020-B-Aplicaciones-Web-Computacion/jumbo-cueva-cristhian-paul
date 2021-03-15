import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('mascota')
export class MascotaEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column(
    )
    nombre: string
}