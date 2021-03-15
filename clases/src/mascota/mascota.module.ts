import { Module } from '@nestjs/common';
import { MascotaController } from './mascota.controller';
import { MascotaService } from './mascota.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MascotaEntity} from "./mascota.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature(
        [MascotaEntity],
        'default'
    ),
  ],
  providers: [MascotaService],
  exports: [],
  controllers: [MascotaController]
})
export class MascotaModule {}
