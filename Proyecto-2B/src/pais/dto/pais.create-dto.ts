import {
    IsAlpha,
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    MaxLength,
    MinLength
} from "class-validator";

export class PaisCreateDto{

    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    nombre:string;

    @IsAlpha()
    @MaxLength(30)
    @MinLength(3)
    capital:String;

    @IsOptional()
    @MinLength(2)
    poblacion:string;

    @IsOptional()
    @MinLength(1)
    numeroEstaciones:string;


    @IsOptional()
    @MinLength(2)
    fundacion:string;
}
