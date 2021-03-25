//importamos uuid para creacion de identificadores unicos
const { v4: uuidv4 } = require('uuid');

//Creamos la clase tarea para el menejo de UNA SOLA TAREA
class Tarea {
    id = '';
    descripcionTarea = '';
    completadoEn = null;
    
    constructor(descripcionTarea) {
        this.id = uuidv4();
        this.descripcionTarea = descripcionTarea;
        this.completadoEn = null;
    }
}

module.exports = Tarea;


