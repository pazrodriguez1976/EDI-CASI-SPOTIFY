import { Injectable } from '@nestjs/common';
import { UsuariosModel } from './usuariosModel';

@Injectable()
export class UsuariosService {
    usuarios = [];

    constructor() {
        const usuariosIniciales = [
            { id: '1', name: 'Paz', surname: 'Rodriguez' },
            { id: '2', name: 'Mariela', surname: 'Presa' },
            { id: '3', name: 'Paula', surname : 'Sanchez' },
            { id: '4', name: 'Daniela', surname: 'Añeli' },
            { id: '5', name: 'Maria', surname: 'Cap' },
            { id: '6', name: 'Alma', surname: 'Prueba' },
        ];
        this.usuarios.push(...usuariosIniciales);
    }

    getUsuarios() {
        return this.usuarios;
    }

    postUsuarios(usuario: UsuariosModel) {
        const newUsuario = {
            id: (this.usuarios.length + 1).toString(), 
            name: usuario.name,
            surname: usuario.surname,
        };
        this.usuarios.push(newUsuario);
        return newUsuario;
    }

    getUsuariossbyid(id: string) {
        return this.usuarios.find(usuario => usuario.id === id);
    
    }

    /*getUsuariosbysurname(surname: string) {
        return this.usuarios.filter(usuario => usuario.surname === surname);
    }*/

    putUsuarios(id: string, updatedUsuario: UsuariosModel) {
        const index = this.usuarios.findIndex(usuario => usuario.id === id);
        if (index === -1) {
            return { mensaje: 'Usuario no encontrado' };
        }
        this.usuarios[index] = { ...this.usuarios[index], ...updatedUsuario };
        return { Mensaje: 'Usuario actualizado', usuario: this.usuarios[index] };
        
    }

    deleteUsuarios(id: string) {
        const index = this.usuarios.findIndex(usuario => usuario.id === id);
        if (index === -1) {
            return { Mensaje: 'Usuario no encontrado' };
        }
        const deleted = this.usuarios.splice(index, 1);
        return { Mensaje: 'Usuario eliminado', usuario: deleted[0] };
    }
}




