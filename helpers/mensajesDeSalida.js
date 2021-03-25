const colors = require('colors');

//Construir el menú inicial
const mostrarMenu = () => {
    
    return new Promise(resolve => {
        console.clear();
        console.log('=========================='.green);
        console.log('  Seleccione una opción   '.green);
        console.log('==========================\n'.green);

        console.log(`${'1'.green}. Crear tarea`);
        console.log(`${'2'.green}. Listar Tareas`);
        console.log(`${'3'.green}. Listar Tareas Completadas `);
        console.log(`${'4'.green}. Listar Tareas Pendientes`);
        console.log(`${'5'.green}. Completar Tarea(s)`);
        console.log(`${'6'.green}. Eliminar Tarea`);
        console.log(`${'0'.green}. Salir\n`);

        //interface para mostrar y recibir informacion al usuario
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        //Mostarmos informacion al usuario con una pregunta
        readline.question('Seleccione una opción: ', (opcion) => {
            // console.log({opcion}); //mostramos la opcion seleccionada por el usuario
            readline.close(); //cerramos la pregunta
            resolve(opcion);
        });
    });
}

//Detenemos la ejecucion hasta que el usuario seleccione una opcion
const pausarAplicacion = () => {
    return new Promise(resolve => {
        //interface para mostrar y recibir informacion al usuario
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        //Mostarmos informacion al usuario con una pregunta
        readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opcion) => {
            readline.close(); //cerramos la pregunta
            resolve();
        });
    });
}

module.exports = {
    mostrarMenu,
    pausarAplicacion
}
