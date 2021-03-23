import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PaisEntity} from "./pais/pais.entity";
import {PaisModule} from "./pais/pais.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import { EdificioModule } from './edificio/edificio.module';
import { PisoModule } from './piso/piso.module';
import { EdificioEntity } from './edificio/edificio.entity';
import { PisoEntity } from './piso/piso.entity';


@Module({
  imports: [PaisModule,
    TypeOrmModule
        .forRoot({
          type: 'mysql', // mysql postgres
          host: 'localhost', // ip
          port: 30720, // puerto
          username: 'web', // usuario
          password: '12345678', // password
          database: 'web', //  Base de Datos
          entities: [  // TODAS LAS ENTIDADES
            PaisEntity,
            EdificioEntity,
            PisoEntity

          ],
          synchronize: true, // Actualiza el esquema de la base de datos
         // dropSchema: true, // Eliminar Datos y el Esquema de base de datos
          retryDelay: 40000,
          retryAttempts: 3,
          connectTimeout: 40000,
          keepConnectionAlive: true,
          charset: 'utf8mb4',
          timezone: 'local',
          ssl: false,
        }),
    EdificioModule,
    PisoModule,



  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
