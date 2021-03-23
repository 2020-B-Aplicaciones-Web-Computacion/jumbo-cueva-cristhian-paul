import {Injectable} from "@nestjs/common";
import {PaisEntity} from "./pais.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";




@Injectable()
export class PaisService{
    constructor( // Inyección de Dependencias
      @InjectRepository(PaisEntity)
      private repositorio: Repository<PaisEntity>
    ) {
    }

    crearUno(nuevoPais: PaisEntity) {
        return this.repositorio.save(nuevoPais) // promesa
    }

    buscarTodos(textoDeConsulta?: string) {
        if (textoDeConsulta !== undefined) {
            const consulta: FindManyOptions<PaisEntity> = {
                where: [
                    {
                        nombre: Like(`%${textoDeConsulta}%`)
                    },
                    {
                        capital: Like(`%${textoDeConsulta}%`)
                    }
                ]
            }
            return this.repositorio.find(consulta);
        } else{
            return this.repositorio.find();
        }
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id) // promesa
    }

    editarUno(paisEditado: PaisEntity) {
        return this.repositorio.save(paisEditado);
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }

}
