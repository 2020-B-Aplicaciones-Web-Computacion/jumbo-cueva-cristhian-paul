import { IsNumberString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class EdificioUpdateDto{

  @IsString()
  @MaxLength(60)
  @MinLength(3)
  nombre:string;

  @IsString()
  @MaxLength(30)
  @MinLength(3)
  direccion: string;

  @IsOptional()
  @IsNumberString()
  @MinLength(10)
  telefono: string;

}
