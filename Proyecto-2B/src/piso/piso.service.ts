import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { PisoEntity } from './piso.entity';

@Injectable()
export class PisoService {

  constructor(@InjectRepository(PisoEntity)
              private readonly _pisoResository: Repository<PisoEntity>) { }

  crearUno(nuevoPais: PisoEntity) {
    return this._pisoResository.save(nuevoPais) // promesa
  }

  buscarTodos(idEdificio: number, textoDeConsulta?: string) {
    if (textoDeConsulta !== undefined) {
      const consulta: FindManyOptions<PisoEntity> = {
        where: [
          {
            nombre: Like(`%${textoDeConsulta}%`)
          },
          {
            descripcion: Like(`%${textoDeConsulta}%`)
          },
          {
            edificio: idEdificio
          }
        ]
      }
      return this._pisoResository.find(consulta);
    } else{
      const consulta: FindManyOptions<PisoEntity> = {
        where: [
          {
            edificio: idEdificio
          }
        ]
      }
      return this._pisoResository.find(consulta);
    }
  }

  buscarUno(id: number) {
    return this._pisoResository.findOne(id) // promesa
  }

  editarUno(pisoEntity: PisoEntity) {
    return this._pisoResository.save(pisoEntity);
  }

  eliminarUno(id: number) {
    return this._pisoResository.delete(id);
  }


}
