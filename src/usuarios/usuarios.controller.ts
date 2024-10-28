import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosModel } from './usuariosModel';


@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly service: UsuariosService) {}

    // Obtener todos los usuarios
    @Get()
    getUsuarios() {
        return this.service.getUsuarios();
    }

    // Crear un nuevo usuario
    @Post()
    postUsuarios(@Body() newUsuario: UsuariosModel) {
        return this.service.postUsuarios(newUsuario);
    }

    // Obtener usuario por nombre
    @Get('id/:id')
    getUsuariosById(@Param('id') id: string) {
        const usuario = this.service.getUsuariossbyid(id);
        if (!usuario) {
            return { mensaje: `No se encontró ningun usuario con el id: ${id}` };
        }
        return usuario;
    }

    // Obtener usuario por apellido
    /*@Get('surname/:surmane')
    getUsuariosBySurname(@Param('surname') surname: string) {
        const usuarios = this.service.getUsuariosbysurname(surname);
        if (usuarios.length === 0) {
            return {Mensaje:`No se encontraron usuarios con el apellido: ${surname}` };
        }
        return usuarios;
    }*/

    // Actualizar una usuario por ID
    @Put(':id')
    putUsuarios(@Param('id') id: string, @Body() updatedUsuario: UsuariosModel)  {
        const result = this.service.putUsuarios(id, updatedUsuario);
        if (result.mensaje === 'Usaurio no encontrada') {
            return { Mensaje: `No se encontró ningun usuario con el ID: ${id}` };
        }
        return result;
    }
    @Delete(':id')
    deleteUsuario(@Param('id') id: string) {
        return this.service.deleteUsuarios(id);
    }
}



