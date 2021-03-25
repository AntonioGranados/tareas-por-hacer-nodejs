const colors = require('colors');
const { guardarDb, leerDb } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    pausarMenu, 
    leerInputDeCrearTarea, 
    listarTareasParaEliminar, 
    confirmarEliminacionDeTarea,
    mostrarCheckListDeTareas } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

// const { mostrarMenu, pausarAplicacion } = require('./helpers/mensajesDeSalida');


const main = async() => {

    let opcion = '';

    //creamos una nueva instancia de Tareas
    const tareas = new Tareas();

    //leemos la informacion del archivo
    const tareasDb = leerDb();

    if (tareasDb) {
        //cargamos las tareas del archivo 
        tareas.cargarTareasDelArreglo(tareasDb);
    }

    do {
        //Esperamos a que inquirerMenu nos muestre el menu de opciones
        opcion = await inquirerMenu();
        
        switch (opcion) {
            case '1':
                //crear opcion
                const descripcion = await leerInputDeCrearTarea('Descripcion:');
                //Almacenamos la tarea en el metodo de crear tarea.
                tareas.crearTarea(descripcion);           
                break;
            
            case '2':
                //listamos la tarea de forma detallada
                tareas.listadoCompletoDeLaTarea();
                break;
            
            case '3':
                //tareas completadas en true
                tareas.listarTareasPendientesOCompletadas(true);
                break;
            
            case '4':
                //tareas pendientes en false
                tareas.listarTareasPendientesOCompletadas(false);
                break;
            
            case '5':
                //obtenemos un arreglo con los ids de las tareas
                const ids = await mostrarCheckListDeTareas(tareas.listadoDeTreasArray);
                //marcamos como completadas o pendientes las tareas
                tareas.cambiarEstadoDeTareas(ids);
                break;

            case '6':
                //obtenemos el id de la tarea que seleccionemos para eliminar.
                const idTarea = await listarTareasParaEliminar(tareas.listadoDeTreasArray);

                //Si no se selecciona el 0, continuamos con la eliminacion
                if (idTarea !== '0') {
                    //Mostramos la confirmacion de la eliminacion de la tarea
                    const confirmarEliminacion = await confirmarEliminacionDeTarea('¿Estás seguro de elimar la tarea?');
                    
                    // si la confirmacion es true, eliminamos la tarea
                    if(confirmarEliminacion) {
                        tareas.eliminarTarea(idTarea);
                        console.log(`${colors.green('Tarea eliminada correctamente')}`);
                    }
                }
                break;
        }

        //guardamos el arreglo de tareas 
        guardarDb(tareas.listadoDeTreasArray);

        await pausarMenu();

        //Si el usuario selecciona 0, la aplicacion se detiene
        // if (opcion !== '0') await pausarAplicacion();

    } while (opcion !== '0' );
}

main();