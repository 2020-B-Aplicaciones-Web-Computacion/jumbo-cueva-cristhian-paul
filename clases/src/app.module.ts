import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MascotaModule } from './mascota/mascota.module';
import { UsuarioModule } from './usuario/usuario.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {MascotaEntity} from "./mascota/mascota.entity";
import { CalculadoraModule } from './calculadora/calculadora.module';

@Module({
  imports: [MascotaModule, UsuarioModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 30720,
      username: 'web',
      password: '12345678',
      database: 'web',
      entities: [UsuarioEntity,MascotaEntity],
      synchronize: true,
      dropSchema: false,
    }),
    CalculadoraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
