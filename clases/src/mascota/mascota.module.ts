import { Module } from '@nestjs/common';
import { MascotaController } from './mascota.controller';

@Module({
  imports: [],
  providers: [],
  exports: [],
  controllers: [MascotaController]
})
export class MascotaModule {}
