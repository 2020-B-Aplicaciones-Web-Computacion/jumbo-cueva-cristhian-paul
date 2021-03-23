import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { EdificioCreateDto } from '../../edificio/dto/edificio-create.dto';
export class PisoCrearDto {


  @IsString()
  @IsNotEmpty()
  descripcion: string

  @IsString()
  @IsNotEmpty()
  nombre: string

  @IsNumber()
  @IsNotEmpty()
  n_departamentos: number

  @IsString()
  @IsNotEmpty()
  pasillo: string

  edificio: number | EdificioCreateDto

}
