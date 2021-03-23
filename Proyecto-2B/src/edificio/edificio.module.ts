import { Module } from '@nestjs/common';
import { EdificioController } from './edificio.controller';
import { EdificioService } from './edificio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EdificioEntity } from './edificio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EdificioEntity], 'default')],
  providers: [EdificioService],
  controllers: [EdificioController],
  exports: [EdificioService],
})
export class EdificioModule {}
