import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [],
  providers: [],
  exports: [],
  controllers: [UsuarioController]
})
export class UsuarioModule {}
