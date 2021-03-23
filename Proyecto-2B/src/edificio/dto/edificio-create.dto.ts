import { IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class EdificioCreateDto{

  @IsString()
  @MaxLength(60)
  @MinLength(3)
  @IsNotEmpty()
  nombre:string;

  @IsString()
  @MaxLength(100)
  @MinLength(3)
  @IsNotEmpty()
  direccion: string;

  @IsOptional()
  @IsNumberString()
  @MinLength(10)
  telefono: string;

}
