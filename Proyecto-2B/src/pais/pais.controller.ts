import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Query,
    Res,
    Session

} from "@nestjs/common";
import {validate, ValidationError} from "class-validator";

import {PaisService} from "./pais.service";
import {PaisUpdateDto} from "./dto/pais.update-dto";
import {PaisEntity} from "./pais.entity";


@Controller("pais")

export class paisController{

    constructor(
        private readonly _PaisService: PaisService
    ){}
    @Get()
    async vistaInicio(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session,
    ){
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._PaisService.buscarTodos(parametrosConsulta.busqueda);
        } catch (error) {
            throw new InternalServerErrorException('Error encontrando pais')
        }
        if (resultadoEncontrado) {
            res.render(
                'home',
                {
                    usuario: session.usuario,
                    arregloPais: resultadoEncontrado,
                    mensaje: parametrosConsulta.mensaje
                });
        } else {
            throw new NotFoundException('No se encontraron pais')
        }
    }










    @Get('crear')
    vistaCrear(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session,
    ){
        res.render(
            'crearPais',
            {

                usuario: session.usuario,
                error: parametrosConsulta.error,

                nombre: parametrosConsulta.nombre,
                capital: parametrosConsulta.capital,
                poblacion: parametrosConsulta.poblacion,
                numeroEstaciones: parametrosConsulta.numeroEstaciones,
                fundacion: parametrosConsulta.fundacion

            }
        )
    }
    @Get('editar/:id')
    async vistaEditar(
        @Res() res,
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Session() session,
    ){
        const id = Number(parametrosRuta.id);
        let paisEncontrado;
        try {
            paisEncontrado= await this._PaisService.buscarUno(id)
            if(paisEncontrado) {
                return res.render(
                    'crearPais',
                    {
                        usuario: session.usuario,
                        error: parametrosConsulta.error,
                         pais : paisEncontrado

                    }
                )
            }else{
                return res.redirect('../pais?mensaje= PAIS no encontrado')
            }
        } catch (e) {
            console.error('Error del servidor')
            return res.redirect('../pais?mensaje=Error busacando')
        }

    }

    @Post('/editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const pais = new PaisUpdateDto();

        pais.nombre = parametrosCuerpo.nombre;
        pais.capital = parametrosCuerpo.capital;
        pais.poblacion = parametrosCuerpo.poblacion;
        pais.numeroEstaciones = parametrosCuerpo.numeroEstaciones;
        pais.fundacion = parametrosCuerpo.fundacion;

        let errores: ValidationError[]
        try{

            errores = await validate(pais);
            const mensaje = '';
        }catch (e) {
            console.error(e)
            return res.redirect('editar/' + parametrosRuta.id + '?error=Error validando datos');
        }
        if (errores.length > 0) {
            console.error('Error', errores);
            return res.redirect('/pais/editar/' + parametrosRuta.id +'?error=Error validando datos')
        }else {
            const paisEditado = {
                id: Number(parametrosRuta.id),
                nombre: parametrosCuerpo.nombre,
                capital: parametrosCuerpo.capital,
                poblacion: parametrosCuerpo.poblacion,
                numeroEstaciones: parametrosCuerpo.numeroEstaciones,
                fundacion: parametrosCuerpo.fundacion

            } as PaisEntity;
            try {
                await this._PaisService.editarUno(paisEditado);
                return res.redirect('/pais?mensaje=pais Editado');
            } catch (error) {
                console.error(error);
                return res.redirect('pais/' + parametrosRuta.id + '?error=Error al editar pais');
            }
        }
    }

    @Post("/crearDesdeVista")
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res
    ) {
        const pais = new PaisUpdateDto();

        pais.nombre = parametrosCuerpo.nombre;
        pais.capital = parametrosCuerpo.capital;
        pais.poblacion = parametrosCuerpo.poblacion;
        pais.numeroEstaciones = parametrosCuerpo.numeroEstaciones;
        pais.fundacion = parametrosCuerpo.fundacion;

        const paisConsulta = `&nombre=${parametrosCuerpo.nombre}&capital=${parametrosCuerpo.capital}&poblacion=${parametrosCuerpo.poblacion}&numeroEstaciones=${parametrosCuerpo.numeroEstaciones}&fundacion=${parametrosCuerpo.fundacion}`
        let errores: ValidationError[]
        try{

            errores = await validate(pais);

            const mensaje = '';
        }catch (e) {
            console.error(e)
            return res.redirect('crear?error=Error validadndo datos' + paisConsulta);
        }

        if (errores.length > 0) {
            console.error('AQUIIII', errores);
            return res.redirect('crear?error=Error datos incorrectos');
        }else{
            let respuestaCreacionUsuario
            try{
                respuestaCreacionUsuario = await this._PaisService.crearUno(parametrosCuerpo)
            } catch (error) {
                console.log(error);
                return res.redirect('pais/crear?error=Error creando ' + paisConsulta);
            }
            if(respuestaCreacionUsuario){
                return res.redirect('../pais?mensaje= creado')
            } else {
                return res.redirect('crear?error=Error creando ' + paisConsulta);
            }
        }
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._PaisService.eliminarUno(id);
            return res.redirect('/pais?mensaje= eliminado');
        } catch (error) {
            console.log(error);
            return res.redirect('/pais?error=Error eliminando');
        }

    }


    @Get("/casa/editar/:id")
    async editarContactoVista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res,
        @Session() session
    ){

        const id = Number(parametrosRuta.id);
        let entrenadorEncontrado;

        try {
            entrenadorEncontrado = await this._PaisService.buscarUno(id);
        } catch(error){
            console.log("errrorr GABY");
            return res.redirect("/pais?mensaje=Error buscando entrenador");
        }
        if(entrenadorEncontrado){
            return res.render(
                'pais/crear',
                {
                    error: parametrosConsulta.error,
                    usuario: session.usuario,
                    pais: entrenadorEncontrado
                }
            )
        } else {
            return res.redirect("/pais?mensaje=Entrenador no encontrada");
        }
    }


}
