import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  Session,
} from '@nestjs/common';
import { PisoService } from './piso.service';
import { validate, ValidationError } from 'class-validator';
import { PisoUpdateDto } from './dto/piso-update.dto';
import { PisoEntity } from './piso.entity';

@Controller('/edificio/:idEdificio/piso')
export class PisoController {    constructor(private readonly _pisoService: PisoService){}

  @Get()
  async vistaInicio(
    @Res() res,
    @Query() parametrosConsulta,
    @Param() parametrosRuta,
    @Session() session,
  ){
    let resultadoEncontrado
    try {
      resultadoEncontrado = await this._pisoService.buscarTodos(parametrosRuta.idEdificio,parametrosConsulta.busqueda);
      console.log(resultadoEncontrado);
    } catch (error) {
      throw new InternalServerErrorException('Error encontrando piso')
    }
    if (resultadoEncontrado) {
      res.render(
        'gestion-pisos',
        {
          idEdificio: parametrosRuta.idEdificio,
          usuario: session.usuario,
          arregloPisos: resultadoEncontrado,
          mensaje: parametrosConsulta.mensaje
        });
    } else {
      throw new NotFoundException('No se encontraron piso')
    }
  }










  @Get('crear')
  vistaCrear(
    @Res() res,
    @Query() parametrosConsulta,
    @Param() parametrosRuta,
    @Session() session,
  ){
    res.render(
      'crear-editar-pisos',
      {

        usuario: session.usuario,
        error: parametrosConsulta.error,
        idEdificio: parametrosRuta.idEdificio,
        nombre: parametrosConsulta.nombre,
        direccion: parametrosConsulta.direccion,
        telefono: parametrosConsulta.telefono,

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
    let pisoEncontrado;
    try {
      pisoEncontrado= await this._pisoService.buscarUno(id)
      if(pisoEncontrado) {
        return res.render(
          'crear-editar-pisos',
          {
            usuario: session.usuario,
            idEdificio: parametrosRuta.idEdificio,
            error: parametrosConsulta.error,
            piso : pisoEncontrado

          }
        )
      }else{
        return res.redirect('../piso?mensaje= PAIS no encontrado')
      }
    } catch (e) {
      console.error('Error del servidor')
      return res.redirect('../piso?mensaje=Error busacando')
    }

  }

  @Post('/editarDesdeVista/:id')
  async editarDesdeVista(
    @Param() parametrosRuta,
    @Body() parametrosCuerpo,
    @Res() res,
  ) {
    const piso = new PisoUpdateDto();

    piso.nombre = parametrosCuerpo.nombre;
    piso.descripcion = parametrosCuerpo.descripcion;
    piso.n_departamentos = +parametrosCuerpo.n_departamentos;
    piso.pasillo = parametrosCuerpo.pasillo;

    let errores: ValidationError[]
    try{

      errores = await validate(piso);
      const mensaje = '';
    }catch (e) {
      console.error(e)
      return res.redirect('editar/' + parametrosRuta.id + '?error=Error validando datos');
    }
    if (errores.length > 0) {
      console.error('Error', errores);
      return res.redirect('/piso/editar/' + parametrosRuta.id +'?error=Error validando datos')
    }else {
      const pisoEditado = {
        id: Number(parametrosRuta.id),
        nombre: parametrosCuerpo.nombre,
        descripcion: parametrosCuerpo.descripcion,
        pasillo: parametrosCuerpo.pasillo,
        n_departamentos: +parametrosCuerpo.n_departamentos,
      } as PisoEntity;
      try {
        await this._pisoService.editarUno(pisoEditado);
        return res.redirect('../?mensaje=piso Editado');
      } catch (error) {
        console.error(error);
        return res.redirect('..piso/' + parametrosRuta.id + '?error=Error al editar piso');
      }
    }
  }

  @Post("/crearDesdeVista")
  async crearDesdeVista(
    @Body() parametrosCuerpo,
    @Param() parametrosRuta,
    @Res() res
  ) {

    const piso = new PisoUpdateDto();

    console.log('esta en en controlador', parametrosCuerpo);
    piso.nombre = parametrosCuerpo.nombre;
    piso.descripcion = parametrosCuerpo.descripcion;
    piso.n_departamentos = +parametrosCuerpo.n_departamentos;
    piso.pasillo = parametrosCuerpo.pasillo;

    const pisoConsulta = `&nombre=${parametrosCuerpo.nombre}&descripcion=${parametrosCuerpo.descripcion}&n_departamentos=${parametrosCuerpo.n_departamentos}&pasillo=${parametrosCuerpo.pasillo}`
    let errores: ValidationError[]
    try{

      errores = await validate(piso);

      const mensaje = '';
    }catch (e) {
      console.error(e)
      return res.redirect('../crear?error=Error validadndo datos' + pisoConsulta);
    }

    if (errores.length > 0) {
      console.error('AQUIIII', errores);
      return res.redirect('../crear?error=Error datos incorrectos');
    }else{
      let respuestaCreacionUsuario
      try{
        parametrosCuerpo.edificio = parametrosRuta.idEdificio
        respuestaCreacionUsuario = await this._pisoService.crearUno(parametrosCuerpo)
      } catch (error) {
        console.log(error);
        return res.redirect('../crear?error=Error creando ' + pisoConsulta);
      }
      if(respuestaCreacionUsuario){
        return res.redirect('../piso?mensaje= creado')
      } else {
        return res.redirect('../crear?error=Error creando ' + pisoConsulta);
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
      await this._pisoService.eliminarUno(id);
      return res.redirect('../?mensaje= eliminado');
    } catch (error) {
      console.log(error);
      return res.redirect('../?error=Error eliminando');
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
      entrenadorEncontrado = await this._pisoService.buscarUno(id);
    } catch(error){
      console.log("errrorr GABY");
      return res.redirect("/piso?mensaje=Error buscando entrenador");
    }
    if(entrenadorEncontrado){
      return res.render(
        'piso/crear',
        {
          error: parametrosConsulta.error,
          usuario: session.usuario,
          piso: entrenadorEncontrado
        }
      )
    } else {
      return res.redirect("/piso?mensaje=Entrenador no encontrada");
    }
  }



  // @Get('listar')
  // async obtenerTodos(
  //   @Body('skip')skip,
  //   @Body('limit')limit
  // ){
  //   console.log(skip,limit)
  //   return await this._pisoService.obtenerTodos(skip,limit);
  // }
  // @Get('encontrarUno/:id')
  // async obtenerUno(
  //   @Param('id')id
  // ){
  //   return await this._pisoService.obtenerUno(id);
  // }
  // @Get('contador')
  // async contador(
  //   //@Query()objectPaginacion:paginacion
  // ){
  //   const conosulta={id:'id'}
  //   console.log(this._pisoService.contador(
  //     conosulta
  //     //objectPaginacion.consulta
  //   ))
  //   console.log('esta contando en controller')
  //   return  await this._pisoService.contador(
  //     conosulta
  //     //objectPaginacion.consulta
  //   );
  // }
  // @Get('buscar')
  // async buscar(
  //   @Query()objetoPaginacion:paginacion
  // ){
  //   return this._pisoService.buscar(objetoPaginacion.skip,objetoPaginacion.limit,objetoPaginacion.consulta)
  // }
  // @Post('crear')
  // async crear(
  //   @Body()usuario
  // ){
  //   return await this._pisoService.crear(usuario);
  // }
  // @Post('actualizar')
  // async editar(
  //   @Body('id')id,
  //   @Body('actualizacion')actualizaciones
  // ){
  //   return await this._pisoService.editar(id,actualizaciones)
  // }
  // @Post('eliminar')
  // eliminar(
  //   @Body('id')id
  // ){
  //
  //   return this._pisoService.eliminar(id)
  // }



}
export interface paginacion{
  skip:number
  limit:number
  consulta:any
}
