import {BadRequestException, Controller, ForbiddenException, Get, Param, Query, Req, Session} from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}



    variables () {
        // tipos de variables

        const texto: string = "";

        interface UsuarioInterface {
            nombre: string;
            apellido: string;
        }
        let objetoUsuario: UsuarioInterface = {
            nombre: 'Adrian',
            apellido: 'Eguez',
        }

        objetoUsuario.apellido;
        objetoUsuario.nombre;

        //primitivas
        let edadAntigua = 22;
        let otraEdad = edadAntigua;
        otraEdad = 60; //edadAntigua = 22; OK

    }


    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('login')
    login(
        @Session() session,
        @Query() parametroConsulta
    ) : string {
        if(parametroConsulta.nombre && parametroConsulta.apellido) {
            session.usuario = {
                nombre:parametroConsulta.nombre,
                apellido: parametroConsulta.apellido,
            }
            if(parametroConsulta.apellido === 'Jumbo'){
                session.usuario.esAdministrador = true
            }
            return 'Se logeo el usuario';
        } else {
            throw new BadRequestException('No envia nombre y apellido') //400
        }
    }
    @Get('quien-soy')
    quiensoy(
        @Session() session,
    ): string {
        if (session.usuario) {
            return session.usuario.nombre + ' ' + session.usuario.apellido;
        }
        else {
            return 'no te has logeado';
        }
    }
    @Get('logout')
    logout(
        @Session() session,
        @Req() request,
    ): string {
       session.usuario = undefined;
       request.session.destroy();
       return 'Gracias por visitarnos'
    }

    @Get('protegido')
    protegido(
        @Session() session,
    ): string {
        if (session.usuario) {
            if( session.usuario.esAdministrador) {
                return 'contenido super oculto'
            }
            throw new ForbiddenException('No tienes rol Admin')
        }
        else {
            throw new ForbiddenException('No tienes rol Admin')
        }
    }

}
