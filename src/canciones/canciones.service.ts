import { Injectable } from '@nestjs/common';
import { CancionesModel } from './cancionesModel';
@Injectable()
export class CancionesService {
    canciones = [];

    constructor() {
        const cancionesIniciales = [
            { id: '1', name: 'Hero', artist: 'David Bowie' },
            { id: '2', name: 'Watermelon in Easter Hay', artist: 'Frank Zappa' },
            { id: '3', name: 'Marquee Moon', artist: 'Television' },
            { id: '4', name: 'Just Like Music', artist: 'Marvin Gaye' },
            { id: '5', name: 'Stronger Than Me', artist: 'Amy Winehouse' },
            { id: '6', name: 'Test', artist: 'Prueba' },
        ];
        this.canciones.push(...cancionesIniciales);
    }

    getCanciones() {
        return this.canciones;
    }

    postCanciones(cancion: CancionesModel) {
        const newCancion = {
            id: (this.canciones.length + 1).toString(), 
            name: cancion.name,
            artist: cancion.artist,
        };
        this.canciones.push(newCancion);
        return newCancion;
    }

    getCancionesbyname(name: string) {
        return this.canciones.find(cancion => cancion.name === name);
    }

    getCancionesbyartist(artist: string) {
        return this.canciones.filter(cancion => cancion.artist === artist);
    }

    putCanciones(id: string, updatedCancion: CancionesModel) {
        const index = this.canciones.findIndex(cancion => cancion.id === id);
        if (index === -1) {
            return { message: 'Canción no encontrada' };
        }
        this.canciones[index] = { ...this.canciones[index], ...updatedCancion };
        return { Mensaje: 'Canción actualizada', cancion: this.canciones[index] };
        
    }

    deleteCancion(id: string) {
        const index = this.canciones.findIndex(cancion => cancion.id === id);
        if (index === -1) {
            return { message: 'Canción no encontrada' };
        }
        const deleted = this.canciones.splice(index, 1);
        return { Mensaje: 'Canción eliminada', cancion: deleted[0] };
    }
}
