import { Module } from '@nestjs/common';
import { CalculadoraController } from './calculadora.controller';
import { CalculadoraService } from './calculadora.service';

@Module({
  controllers: [CalculadoraController],
  providers: [CalculadoraService]
})
export class CalculadoraModule {}
