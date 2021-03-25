const colors = require('colors');
const Tarea = require("./tarea");

//clase para el manejo de las tareas
class Tareas {
    _listadoDeTareas = {};

    //transformar el objeto listado de tareas en arreglo usando un getter
    get listadoDeTreasArray() {
        //creamos un arreglo
        const listadoTareas = [];

        //funcion que permite retornar todas las llaves que contiene el objeto _listadoDeTareas
        //como esto crea un arreglo lo podemos recorrer con un forEach
        Object.keys(this._listadoDeTareas).forEach(llave => {
            //extreaemos la tarea del listado de tareas
            const tarea = this._listadoDeTareas[llave];

            //agregamos la tarea al arreglo de listadoTareas
            listadoTareas.push(tarea);
        });

        //retornamos el listado de tareas
        return listadoTareas;
    }

    constructor() {
        this._listadoDeTareas = {};
    }

    //metodo para cargar las tareas del arreglo de tareas
    cargarTareasDelArreglo(tareas = []) {

        //recorremos el arreglo con un forEach
        tareas.forEach(tarea => {
            //extraemos el id de la tarea y la asignamos a la tarea. 
            this._listadoDeTareas[tarea.id] = tarea;
        });
    }

    //metodo para crear una tarea
    crearTarea(descripcionTarea) {

        //nueva instancia de tarea
        const tarea = new Tarea(descripcionTarea);

        //Almacenamos la nueva tarea en el listadoDeTareas
        this._listadoDeTareas[tarea.id] = tarea;
    }

    //Método para obtener la informacion completa y estructurada de la tarea
    listadoCompletoDeLaTarea() {

        //Obtenemos un arreglo con las llaves del objeto _listadoTareas
        Object.keys(this._listadoDeTareas).forEach((tarea, index) => {
            
            //desestructuramos para obtener la descripcion y completado del objeto _listadoDeTareas
            const {descripcionTarea, completadoEn} = this._listadoDeTareas[tarea];

            //Creamos un contador para enumerar las taras, en el index tenemos las llaves
            const contador = index + 1; 

            //variable para validar en que estado esta la tarea
            let estado;

            //Si la tarea es null la ponemos como pendiente
            if (completadoEn === null) {
                estado = `${colors.red('Pendiente')}`;
            } else {
                //Si no esta null la ponemos completada
                estado = `${colors.green('Completado')}`;
            }

            //Armamos el string con toda la informacion
            console.log(`${colors.yellow(contador + '.')} ${descripcionTarea} :: ${estado}`);
        });
    }

    //Metodo para mostrar las tareas pendientes o completadas
    listarTareasPendientesOCompletadas(completadas = true) {
        //Iniciamos un contador
        let contador = 0;

        //Obtenemos un arreglo con las llaves del objeto _listadoTareas
        Object.keys(this._listadoDeTareas).forEach(tarea => {

            //desestructuramos para obtener la descripcion y completado del objeto _listadoDeTareas
            const {descripcionTarea, completadoEn} = this._listadoDeTareas[tarea];
            
            //variable para validar en que estado esta la tarea
            let estado;
            
            //si la tarea esta completada, es decir, en true
            if (completadas) {
                //si la tarea no es null, es porque esta completada
                if (completadoEn) {
                    contador += 1;
                    estado = `${colors.green('Completado')}`;;
                    console.log(`${colors.yellow(contador + '.')} ${descripcionTarea} :: ${colors.yellow(completadoEn)}`);
                }
            } else {
                //si la tarea es null esta pendiente
                if(!completadoEn) {
                    contador += 1;
                    estado = `${colors.red('Pendiente')}`;
                    console.log(`${colors.yellow(contador + '.')} ${descripcionTarea} :: ${estado}`);
                }
            }
        });
    }

    //Metodo para eliminar una tarea
    eliminarTarea(id) {
        
        //Si existe el id de la tarea, lo eliminamos
        if (this._listadoDeTareas[id]) {
            delete this._listadoDeTareas[id];
        }
    }

    //cambiar los estados de la tarea cuando completemos uno
    cambiarEstadoDeTareas(ids = []) {

        //recorremos el arreglo de ids
        ids.forEach(id => {
            //extraemos la tarea por id
            const tarea = this._listadoDeTareas[id];

            //si la tarea no estaba previamente completada, es decir esta en null 
            if (!tarea.completadoEn) {
                //ponemos la tarea como completada con la fecha en la que se completo
                tarea.completadoEn = new Date().toISOString();
            }
        });

        //recorremos el arreglo de tareas
        this.listadoDeTreasArray.forEach(tarea => {
            //si el id de la tarea no se encuentra dentro del arreglo de ids
            if (!ids.includes(tarea.id)) {
                //le quitamos el completado a la tarea
                this._listadoDeTareas[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;

