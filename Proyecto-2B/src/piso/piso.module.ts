import { Module } from '@nestjs/common';
import { PisoController } from './piso.controller';
import { PisoService } from './piso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PisoEntity } from './piso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PisoEntity], 'default')],
  providers: [PisoService],
  controllers: [PisoController],
  exports: [PisoService],
})
export class PisoModule {}
