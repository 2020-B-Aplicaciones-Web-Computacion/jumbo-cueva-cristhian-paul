import {
    IsAlpha,
    IsEmpty,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    MaxLength, MinLength
} from 'class-validator';

export class PaisUpdateDto {
    @IsEmpty()
    id?:number;

    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    nombre:string;

    @IsOptional()
    @IsAlpha()
    @MaxLength(30)
    capital:string;

    @IsOptional()
    @MinLength(1)
    poblacion:string;

    @IsOptional()
    @MinLength(2)
    numeroEstaciones:string;


    @IsOptional()
    @MinLength(2)
    fundacion:string;

}
