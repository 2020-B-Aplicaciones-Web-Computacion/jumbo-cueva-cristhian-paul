import {Body, Controller, Get, HttpCode, Param, Patch, Post, Put, Query, Req, Res} from '@nestjs/common';

@Controller('calculadora')
export class CalculadoraController {

    public puntaje:string = '';
    @Get('setear-nombre/:nombre')
    seteatyrNpmbre(
        @Param() parametrosRuta,
        @Req() request,
        @Res({passthrough:true}) response,
    ) {
        console.log('request',request.cookies);
        response.cookie('nombreUsuario', parametrosRuta.nombre)
        response.cookie('puntaje', 100);
        return 'Cookie con nombre ' + parametrosRuta.nombre + ' seteada';
    }

    @Get('sumar')
    @HttpCode(202)
    sumar(
        @Query() valores,
        @Req() request,
        @Res({passthrough:true}) response,
    ) {
        const respuesta = +valores.a + +valores.b
        if(!request.cookies.nombreUsuario && !request.cookies.puntaje){
            return 'Setear un nombre en la ruta ejemplo: "setear-nombre/carlos "'
        }
        if(request.cookies.puntaje < 0) {
            response.cookie('puntaje', 100);
            return 'Felicidades Ganaste" ' + request.cookies.nombreUsuario
        } else {
            response.cookie('puntaje', eval('request.cookies.' + 'puntaje') - respuesta);
            return 'Suma = '+ respuesta + ' ' + ' Usuario: ' + request.cookies.nombreUsuario
        }
    }

    @Post('resta')
    @HttpCode(201)
    resta(
        @Body() valores,
        @Req() request,
        @Res({passthrough:true}) response,
    ) {
        const respuesta = +valores.a - +valores.b
        if(!request.cookies.nombreUsuario && !request.cookies.puntaje){
            return 'Setear un nombre en la ruta ejemplo: "setear-nombre/carlos "'
        }
        if(request.cookies.puntaje < 0) {
            response.cookie('puntaje', 100);
            return 'Felicidades Ganaste" ' + request.cookies.nombreUsuario
        } else {
            response.cookie('puntaje', eval('request.cookies.' + 'puntaje') - +parseInt(respuesta.toString().replace(/-/,'')));
            return 'Resta = '+ respuesta + ' ' +' Usuario: ' + request.cookies.nombreUsuario
        }

    }

    @Put('multiplicar/:a/:b')
    @HttpCode(200)
    Multiplicar(
        @Param() valores,
        @Req() request,
        @Res({passthrough:true}) response,
    ) {
        const respuesta = +valores.a * +valores.b
        if(!request.cookies.nombreUsuario && !request.cookies.puntaje){
            return 'Setear un nombre en la ruta ejemplo: "setear-nombre/carlos "'
        }
        if(request.cookies.puntaje < 0) {
            response.cookie('puntaje', 100);
            return 'Felicidades Ganaste" ' + request.cookies.nombreUsuario
        } else {
            response.cookie('puntaje', eval('request.cookies.' + 'puntaje') - respuesta);
            return 'Resultado = '+ respuesta + ' ' + ' Usuario: ' + request.cookies.nombreUsuario
        }

    }

    @Patch('dividir')
    @HttpCode(201)
    dividir(
        @Req() request,
        @Res({passthrough:true}) response,
    ) {
        const respuesta = +request.headers.a / +request.headers.b
        if(!request.cookies.nombreUsuario && !request.cookies.puntaje){
            return 'Setear un nombre en la ruta ejemplo: "setear-nombre/carlos "'
        }
        if(request.cookies.puntaje < 0) {
            response.cookie('puntaje', 100);
            return 'Felicidades Ganaste" ' + request.cookies.nombreUsuario
        } else {
            response.cookie('puntaje', eval('request.cookies.' + 'puntaje') - respuesta);
            return 'Resultaado = '+ respuesta + ' '  + ' Usuario: ' + request.cookies.nombreUsuario
        }

    }
}
