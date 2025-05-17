import * as SQLite from "expo-sqlite";
import { RegistroType } from "../types/semana";

export default function useDatabase() {
    // Función para obtener la instancia de la base de datos
    const getDb = async () => {
        try {
            const db = await SQLite.openDatabaseAsync("registros.db");
            console.log("Base de datos abierta correctamente.");
            return db;
        } catch (error) {
            console.error("Error al abrir la base de datos:", error);
            throw error;
        }
    };

    // Crear la tabla de forma asíncrona
    const crearTabla = async () => {
        console.log("Creando tabla...");
        const db = await getDb();
        try {
            await db.execAsync(`
        CREATE TABLE IF NOT EXISTS registros (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          timestamp TEXT DEFAULT CURRENT_TIMESTAMP
        );
      `);
        } catch (error) {
            console.error("Error al crear tabla:", error);
            throw error;
        }
    };

    // Guardar un registro
    const guardarRegistro = async (fecha: string, semana?: string) => {
        console.log("Guardando registro con fecha:", fecha);
        const db = await getDb();
        try {
            const result = await db.runAsync(
                `INSERT INTO registros (timestamp) VALUES (?);`,
                [fecha]
            );
            console.log("Registro insertado, ID:", result.lastInsertRowId);
            return result;
        } catch (error) {
            console.error("Error al insertar registro:", error);
            throw error;
        }
    };

    // Obtener el primer registro
    const obtenerPrimerRegistro = async () => {
        console.log("Obteniendo primer registro...");
        const db = await getDb();
        try {
            const firstRow = await db.getFirstAsync<RegistroType>(
                "SELECT * FROM registros"
            );
            if (firstRow) {
                console.log(firstRow.id, firstRow.timestamp);
            } else {
                console.log("No se encontraron registros");
            }
            return firstRow;
        } catch (error) {
            console.error("Error al obtener el registro:", error);
            throw error;
        }
    };

    // Obtener todos los registros
    const obtenerTodosRegistros = async () => {
        console.log("Obteniendo todos los registros...");
        const db = await getDb();
        try {
            const resultado = await db.getAllAsync<RegistroType>(
                "SELECT * FROM registros"
            );
            console.log("Registros obtenidos:", resultado);
            return resultado;
        } catch (error) {
            console.error("Error al obtener registros:", error);
            throw error;
        }
    };

    // Vaciar la tabla
    const vaciarTabla = async () => {
        console.log("Vaciando tabla...");
        const db = await getDb();
        try {
            await db.execAsync("DELETE FROM registros;");
            console.log("Tabla vaciada exitosamente.");
        } catch (error) {
            console.error("Error al vaciar la tabla:", error);
            throw error;
        }
    };

    // Eliminar un registro por ID
    const eliminarRegistro = async (id: number) => {
        console.log("Eliminando registro con ID:", id);
        const db = await getDb();
        try {
            const result = await db.runAsync(
                "DELETE FROM registros WHERE id = ?;",
                [id]
            );
            console.log("Registro eliminado, filas afectadas:", result.changes);
            return result;
        } catch (error) {
            console.error("Error al eliminar el registro:", error);
            throw error;
        }
    };

    return {
        crearTabla,
        guardarRegistro,
        obtenerPrimerRegistro,
        obtenerTodosRegistros,
        vaciarTabla,
        eliminarRegistro,
    };
}