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
import { EdificioService } from './edificio.service';
import { validate, ValidationError } from 'class-validator';
import { EdificioEntity } from './edificio.entity';
import { EdificioUpdateDto } from './dto/edificio-update.dto';

@Controller('edificio')
export class EdificioController {  constructor(private readonly _edificioService: EdificioService){}

  @Get()
  async vistaInicio(
    @Res() res,
    @Query() parametrosConsulta,
    @Session() session,
  ){
    let resultadoEncontrado
    try {
      resultadoEncontrado = await this._edificioService.buscarTodos(parametrosConsulta.busqueda);
      console.log(resultadoEncontrado);
    } catch (error) {
      throw new InternalServerErrorException('Error encontrando edificio')
    }
    if (resultadoEncontrado) {
      res.render(
        'gestion-edificio',
        {
          usuario: session.usuario,
          arregloEdificio: resultadoEncontrado,
          mensaje: parametrosConsulta.mensaje
        });
    } else {
      throw new NotFoundException('No se encontraron edificio')
    }
  }










  @Get('crear')
  vistaCrear(
    @Res() res,
    @Query() parametrosConsulta,
    @Session() session,
  ){
    res.render(
      'crear-editar-edificio',
      {

        usuario: session.usuario,
        error: parametrosConsulta.error,

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
    let edificioEncontrado;
    try {
      edificioEncontrado= await this._edificioService.buscarUno(id)
      if(edificioEncontrado) {
        return res.render(
          'crear-editar-edificio',
          {
            usuario: session.usuario,
            error: parametrosConsulta.error,
            edificio : edificioEncontrado

          }
        )
      }else{
        return res.redirect('../edificio?mensaje= PAIS no encontrado')
      }
    } catch (e) {
      console.error('Error del servidor')
      return res.redirect('../edificio?mensaje=Error busacando')
    }

  }

  @Post('/editarDesdeVista/:id')
  async editarDesdeVista(
    @Param() parametrosRuta,
    @Body() parametrosCuerpo,
    @Res() res,
  ) {
    const edificio = new EdificioUpdateDto();

    edificio.nombre = parametrosCuerpo.nombre;
    edificio.direccion = parametrosCuerpo.direccion;
    edificio.telefono = parametrosCuerpo.telefono;

    let errores: ValidationError[]
    try{

      errores = await validate(edificio);
      const mensaje = '';
    }catch (e) {
      console.error(e)
      return res.redirect('editar/' + parametrosRuta.id + '?error=Error validando datos');
    }
    if (errores.length > 0) {
      console.error('Error', errores);
      return res.redirect('/edificio/editar/' + parametrosRuta.id +'?error=Error validando datos')
    }else {
      const edificioEditado = {
        id: Number(parametrosRuta.id),
        nombre: parametrosCuerpo.nombre,
        direccion: parametrosCuerpo.direccion,
        telefono: parametrosCuerpo.telefono,
      } as EdificioEntity;
      try {
        await this._edificioService.editarUno(edificioEditado);
        return res.redirect('/edificio?mensaje=edificio Editado');
      } catch (error) {
        console.error(error);
        return res.redirect('edificio/' + parametrosRuta.id + '?error=Error al editar edificio');
      }
    }
  }

  @Post("/crearDesdeVista")
  async crearDesdeVista(
    @Body() parametrosCuerpo,
    @Res() res
  ) {
    const edificio = new EdificioUpdateDto();

    edificio.nombre = parametrosCuerpo.nombre;
    edificio.direccion = parametrosCuerpo.direccion;
    edificio.telefono = parametrosCuerpo.telefono;

    const edificioConsulta = `&nombre=${parametrosCuerpo.nombre}&direccion=${parametrosCuerpo.direccion}&telefono=${parametrosCuerpo.telefono}`
    let errores: ValidationError[]
    try{

      errores = await validate(edificio);

      const mensaje = '';
    }catch (e) {
      console.error(e)
      return res.redirect('crear?error=Error validadndo datos' + edificioConsulta);
    }

    if (errores.length > 0) {
      console.error('AQUIIII', errores);
      return res.redirect('crear?error=Error datos incorrectos');
    }else{
      let respuestaCreacionUsuario
      try{
        respuestaCreacionUsuario = await this._edificioService.crearUno(parametrosCuerpo)
      } catch (error) {
        console.log(error);
        return res.redirect('edificio/crear?error=Error creando ' + edificioConsulta);
      }
      if(respuestaCreacionUsuario){
        return res.redirect('../edificio?mensaje= creado')
      } else {
        return res.redirect('crear?error=Error creando ' + edificioConsulta);
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
      await this._edificioService.eliminarUno(id);
      return res.redirect('/edificio?mensaje= eliminado');
    } catch (error) {
      console.log(error);
      return res.redirect('/edificio?error=Error eliminando');
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
      entrenadorEncontrado = await this._edificioService.buscarUno(id);
    } catch(error){
      console.log("errrorr GABY");
      return res.redirect("/edificio?mensaje=Error buscando entrenador");
    }
    if(entrenadorEncontrado){
      return res.render(
        'edificio/crear',
        {
          error: parametrosConsulta.error,
          usuario: session.usuario,
          edificio: entrenadorEncontrado
        }
      )
    } else {
      return res.redirect("/edificio?mensaje=Entrenador no encontrada");
    }
  }





  // @Get('listar')
  // async obtenerTodos(
  //   @Body('skip')skip,
  //   @Body('limit')limit
  // ){
  //   console.log(skip,limit)
  //   return await this._edificioService.obtenerTodos(skip,limit);
  // }
  // @Get('encontrarUno/:id')
  // async obtenerUno(
  //   @Param('id')id
  // ){
  //   return await this._edificioService.obtenerUno(id);
  // }
  // @Get('contador')
  // async contador(
  //   //@Query()objectPaginacion:paginacion
  // ){
  //   const conosulta={id:'id'}
  //   console.log(this._edificioService.contador(
  //     conosulta
  //     //objectPaginacion.consulta
  //   ))
  //   console.log('esta contando en controller')
  //   return  await this._edificioService.contador(
  //     conosulta
  //     //objectPaginacion.consulta
  //   );
  // }
  // @Get('buscar')
  // async buscar(
  //   @Query()objetoPaginacion:paginacion
  // ){
  //   return this._edificioService.buscar(objetoPaginacion.skip,objetoPaginacion.limit,objetoPaginacion.consulta)
  // }
  // @Post('crear')
  // async crear(
  //   @Body()usuario
  // ){
  //   return await this._edificioService.crear(usuario);
  // }
  // @Post('actualizar')
  // async editar(
  //   @Body('id')id,
  //   @Body('actualizacion')actualizaciones
  // ){
  //   return await this._edificioService.editar(id,actualizaciones)
  // }
  // @Post('eliminar')
  // eliminar(
  //   @Body('id')id
  // ){
  //
  //   return this._edificioService.eliminar(id)
  // }
  //


}