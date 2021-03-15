import {Body, Controller, Get, HttpCode, Param, Post, Req, Res} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";

@Controller('usuario')
export class UsuarioController {
    constructor(
        private _usuarioService: UsuarioService
    ) {}

    @Get('hola')
    hola(
        @Req() reques,
        // @Res() response
    ) {
        return 'hola mundo http';
    }

    @Get('setear-nombre/:nombre')
    setearNpmbre(
        @Param() parametrosRuta,
        @Req() reques,
        @Res({passthrough:true}) response,
    ) {
        console.log('request',reques.cookies);
        // reques.cokkies.nombreUsuario
        response.cookie('nombreUsuario', parametrosRuta.nombre)
        return 'Cookie con nombre' + parametrosRuta.nombre + 'seteada';
    }

    @Post('crear')
    crearUsuario(
        @Body() parametrosCuerpo
    ) {
        return this._usuarioService._usuarioEntity.save({
            nombre: parametrosCuerpo.nombre
        })
    }

    @Get('usuarios')
    usuarios(
    ) {
        return this._usuarioService._usuarioEntity.find()
    }
}
