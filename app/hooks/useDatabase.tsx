import * as SQLite from "expo-sqlite";

export default function useDatabase() {

    const db = SQLite.openDatabaseAsync("registros.db");

    const crearTabla = async () => {
        console.log('Creando tabla...');
        (await db).execSync(
            `
          CREATE TABLE IF NOT EXISTS registros (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                semana VARCHAR(50) NOT NULL
            );
          `
        )
    };

    const guardarRegistro = async (fecha: string) => {
        // const statement = await (await db).prepareAsync(
        //     'INSERT INTO registros (value, intValue) VALUES ($value, $intValue)'
        // );
        console.log('Guardando registro con fecha:', fecha);
        const result = (await db).execAsync(`
            INSERT INTO registros (timestamp, semana) VALUES ('${fecha}', 'semana 1');
            `)
        console.log('Resultado de la inserción:', await result);
    }
    const obtenerPrimerRegistro = async () => {
        try {
            const firstRow = await (await db).getFirstAsync('SELECT * FROM registros');
            if (firstRow) {
                console.log(firstRow.id, firstRow.timestamp, firstRow.semana);
            } else {
                console.log("No se encontraron registros");
            }
        } catch (error) {
            console.error("Error al obtener el registro:", error);
        }
    }

    const obtenerTodosRegistros = async () => {
        console.log('Obteniendo todos los registros...');
        const resultado = (await db).getAllAsync('SELECT * FROM registros');
        console.log('Registros obtenidos:', await resultado);
        return resultado;
    }

    const vaciarTabla = async () => {
        try {
            (await db).execSync('DELETE FROM registros;');
            console.log('Tabla vaciada exitosamente.');
        } catch (error) {
            console.error('Error al vaciar la tabla:', error);
        }
    };

    const eliminarRegistro = async (id: number) => {
        try {
            const result = (await db).execAsync(`
                DELETE FROM registros WHERE id = ${id};
            `);
            console.log('Resultado de la inserción:', await result);
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    }

    return {
        crearTabla,
        guardarRegistro,
        obtenerPrimerRegistro,
        obtenerTodosRegistros,
        vaciarTabla,
        eliminarRegistro
    }
}