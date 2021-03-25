//importamos inquirer
const inquirer = require('inquirer');

//importamos colors
const colors = require('colors');

//creamos las preguntas del menu
const preguntasDelMenu = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué Desea Hacer?',
        choices: [
            {
                value: '1',
                name: `${colors.green('1.')} Crear Tarea`
            },
            {
                value: '2',
                name: `${colors.green('2.')} Listar Tarea`
            },
            {
                value: '3',
                name: `${colors.green('3.')} Listar Tareas Completadas`
            },
            {
                value: '4',
                name: `${colors.green('4.')} Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${colors.green('5.')} Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${colors.green('6.')} Eliminar Tarea`
            },
            {
                value: '0',
                name: `${colors.green('0.')} Salir`
            }
        ]
    }
];

//Mostramos la opcion cuando se pause el menu
const pregunta = [
    {
        type: 'input',
        name: 'enter',
        message: `Presione ${colors.green('ENTER')} para continuar`
    }
]

//creacion del menu
const inquirerMenu = async() => {
    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opción   '.white);
    console.log('==========================\n'.green);
    
    //Desestructuramos para que nos muestre unicamente la opcion que seleccionemos
    const {opcion} = await inquirer.prompt(preguntasDelMenu);

    return opcion;
}

//Pausamos el menu para cuando el usuario seleccione una opcion, no vuelva a mostrar el menu,
//si no deje realizar la accion correspondiente
const pausarMenu = async() => {

    console.log('\n');
    const {enter} = await inquirer.prompt(pregunta);
    
    return enter;
}

//leemos el input donde crearemos una nueva tarea
const leerInputDeCrearTarea = async(mensaje) => {
    const pregunta = [
        {
            type: 'input',
            name: 'descripcion',
            message: mensaje,
            validate(value) {
                if (value.length === 0) {
                    return 'La tarea no puede estar vacía, por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {descripcion} = await inquirer.prompt(pregunta);
    return descripcion;
}

//Listar las tareas para seleccionar la tarea que queremos eliminar
const listarTareasParaEliminar = async(tareas = []) => {

    //Recorremos las tareas para generar un nuevo arreglo con el id y la desc de la tarea
    const opciones = tareas.map((tarea, index) => {

        //generamos un contador
        const contador = `${colors.yellow(index + 1 + '.')}`;

        //retonamos el id de la tarea y la descripcion
        return {
            value: tarea.id,
            name: `${contador} ${tarea.descripcionTarea}`
        }
    });

    //Agregamos la opcion 0 para regresar al menu de inicio, en caso de no eliminar ninguna tarea
    opciones.unshift({
        value: '0',
        name: `${colors.yellow(`0.`)} Cancelar`
    });

    //Generamos las preguntas que va a contener el listado de tareas para el inquierer.prompt
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices: opciones
        }
    ]

    //mostramos en consola
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

//Mostrar el mensaje para confirmar una eliminacion de tareas
const confirmarEliminacionDeTarea = async(mensajeDeConfirmacion) => {
    
    //definimos la pregunta para confirmar la eliminacion de tipo confirm
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensajeDeConfirmacion
        }
    ];

    //mostramos en consola
    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

//mostramos un check list para seleccionar multipleas tareas
const mostrarCheckListDeTareas = async(tareas = []) => {

    //Recorremos las tareas para generar un nuevo arreglo con el id y la desc de la tarea
    const opciones = tareas.map((tarea, index) => {

        //generamos un contador
        const contador = `${colors.yellow(index + 1 + '.')}`;

        //retonamos el id de la tarea y la descripcion y validamos si completadoEn existe
        //lo ponemos en true y de esta manera las tareas completadas, si no sería false
        //Apareceran checkeadas
        return {
            value: tarea.id,
            name: `${contador} ${tarea.descripcionTarea}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    //Generamos las preguntas que va a contener el listado de tareas para el inquierer.prompt
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices: opciones
        }
    ]

    //mostramos en consola
    const {ids} = await inquirer.prompt(preguntas);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausarMenu,
    leerInputDeCrearTarea,
    listarTareasParaEliminar,
    confirmarEliminacionDeTarea,
    mostrarCheckListDeTareas
}