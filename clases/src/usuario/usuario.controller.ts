import {Controller, Get, HttpCode, Param, Req, Res} from '@nestjs/common';

@Controller('usuario')
export class UsuarioController {

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
}
