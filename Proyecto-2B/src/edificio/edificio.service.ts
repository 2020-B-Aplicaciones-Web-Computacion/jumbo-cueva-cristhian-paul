import { Injectable } from '@nestjs/common';
import { EdificioEntity } from './edificio.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaisEntity } from '../pais/pais.entity';

@Injectable()
export class EdificioService {
  constructor(@InjectRepository(EdificioEntity)
              private readonly _edificioRepository: Repository<EdificioEntity>) { }

  crearUno(nuevoPais: PaisEntity) {
    return this._edificioRepository.save(nuevoPais) // promesa
  }

  buscarTodos(textoDeConsulta?: string) {
    if (textoDeConsulta !== undefined) {
      const consulta: FindManyOptions<EdificioEntity> = {
        where: [
          {
            nombre: Like(`%${textoDeConsulta}%`)
          },
          {
            direccion: Like(`%${textoDeConsulta}%`)
          }
        ]
      }
      return this._edificioRepository.find(consulta);
    } else{
      return this._edificioRepository.find();
    }
  }

  buscarUno(id: number) {
    return this._edificioRepository.findOne(id) // promesa
  }

  editarUno(paisEditado: EdificioEntity) {
    return this._edificioRepository.save(paisEditado);
  }

  eliminarUno(id: number) {
    return this._edificioRepository.delete(id);
  }

}
