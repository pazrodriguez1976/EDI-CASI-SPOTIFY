import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CancionesService } from './canciones.service';
import { CancionesModel } from './cancionesModel';

@Controller('canciones')
export class CancionesController {
    constructor(private readonly service: CancionesService) {}

    // Obtener todas las canciones
    @Get()
    getCanciones() {
        return this.service.getCanciones();
    }

    // Crear una nueva canción
    @Post()
    postCanciones(@Body() newCancion: CancionesModel) {
        return this.service.postCanciones(newCancion);
    }

    // Obtener canción por nombre
    @Get('name/:name')
    getCancionesByName(@Param('name') name: string) {
        const cancion = this.service.getCancionesbyname(name);
        if (!cancion) {
            return { message: `No se encontró ninguna canción con el nombre: ${name}` };
        }
        return cancion;
    }

    // Obtener canciones por artista
    @Get('artist/:artist')
    getCancionesByArtist(@Param('artist') artist: string) {
        const canciones = this.service.getCancionesbyartist(artist);
        if (canciones.length === 0) {
            return {Mensaje:`No se encontraron canciones del artista: ${artist}` };
        }
        return canciones;
    }

    // Actualizar una canción por ID
    @Put(':id')
    putCanciones(@Param('id') id: string, @Body() updatedCancion: CancionesModel)  {
        const result = this.service.putCanciones(id, updatedCancion);
        if (result.message === 'Canción no encontrada') {
            return { Mensaje: `No se encontró ninguna canción con el ID: ${id}` };
        }
        return result;
    }
    @Delete(':id')
    deleteCancion(@Param('id') id: string) {
        return this.service.deleteCancion(id);
    }
}



