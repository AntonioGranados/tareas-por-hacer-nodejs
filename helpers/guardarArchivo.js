const fs = require('fs');

//ruta donde se va guardar el archivo
const archivo = './db/data.json';

//creamos el archivo de teto donde se guardaran las tareas
const guardarDb = (informacionAGuardar) => {

    //creamos el archivo
    fs.writeFileSync(archivo, JSON.stringify(informacionAGuardar));
}

const leerDb = () => {

    //Validamos si el no archivo existe entonces retornamos null
    if (!fs.existsSync(archivo)) {
        return null;
    }

    //si el archivo existe, leemos su informacion
    const informacionDelArchivo = fs.readFileSync(archivo, {encoding: 'utf-8'});

    //convertimos la informacion del archivo en un json
    const data = JSON.parse(informacionDelArchivo);
    
    return data;
}

module.exports = {
    guardarDb,
    leerDb
}