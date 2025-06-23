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

  // Crear la tabla de registros
  const crearTabla = async () => {
    const db = await getDb();
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS consumo_diario (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fecha TEXT NOT NULL,
          cantidad REAL NOT NULL,
          semana INTEGER NOT NULL,
          timestamp TEXT DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("Tabla consumo_diario creada exitosamente.");
    } catch (error) {
      console.error("Error al crear tabla consumo_diario:", error);
      throw error;
    }
  };

  // Crear la tabla de programed_dosifications
  const crearTabla2 = async () => {
    console.log("Creando tabla programed_dosifications...");
    const db = await getDb();
    try {
      await db.execAsync(`
                CREATE TABLE IF NOT EXISTS programed_dosifications (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT DEFAULT CURRENT_TIMESTAMP
                );
            `);
    } catch (error) {
      console.error("Error al crear tabla programed_dosifications:", error);
      throw error;
    }
  };

  const guardarRegistro = async (
    fecha: string,
    cantidad: number,
    semana: number
  ) => {
    console.log("Guardando consumo diario:", { fecha, cantidad, semana });
    const db = await getDb();
    try {
      const result = await db.runAsync(
        `INSERT INTO consumo_diario (fecha, cantidad, semana) VALUES (?, ?, ?);`,
        [fecha, cantidad, semana]
      );
      console.log("Consumo diario insertado, ID:", result.lastInsertRowId);
      return result;
    } catch (error) {
      console.error("Error al insertar consumo diario:", error);
      throw error;
    }
  };

  // Guardar un registro en la tabla registros
  //   const guardarRegistro = async (fecha: string, semana?: string) => {
  //     console.log("Guardando registro con fecha:", fecha);
  //     const db = await getDb();
  //     try {
  //       const result = await db.runAsync(
  //         `INSERT INTO registros (timestamp) VALUES (?);`,
  //         [fecha]
  //       );
  //       console.log("Registro insertado, ID:", result.lastInsertRowId);
  //       return result;
  //     } catch (error) {
  //       console.error("Error al insertar registro:", error);
  //       throw error;
  //     }
  //   };

  // Vaciar la tabla programed_dosifications
  const vaciarTablaDosificaciones = async () => {
    console.log("Vaciando tabla programed_dosifications...");
    const db = await getDb();
    try {
      await db.execAsync("DELETE FROM programed_dosifications;");
      console.log("Tabla programed_dosifications vaciada exitosamente.");
    } catch (error) {
      console.error("Error al vaciar la tabla programed_dosifications:", error);
      throw error;
    }
  };

  // Guardar un registro en programed_dosifications, vaciando la tabla primero
  const guardarDosificacion = async (fecha: string) => {
    const db = await getDb();
    try {
      // Vaciar la tabla antes de insertar
      await vaciarTablaDosificaciones();
      // Insertar el nuevo registro
      const result = await db.runAsync(
        `INSERT INTO programed_dosifications (timestamp) VALUES (?);`,
        [fecha]
      );
      console.log("Dosificación insertada, ID:", result.lastInsertRowId);
      return result;
    } catch (error) {
      console.error("Error al insertar dosificación:", error);
      throw error;
    }
  };

  // Obtener el primer registro de programed_dosifications
  const obtenerDosificacionProgramada = async () => {
    console.log("Obteniendo primer registro...");
    const db = await getDb();
    try {
      const firstRow = await db.getFirstAsync<{ id: number; timestamp: Date }>(
        "SELECT * FROM programed_dosifications"
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

  // Obtener todos los registros de la tabla registros
  const obtenerTodosRegistros = async () => {
    console.log("Obteniendo todos los registros...");
    const db = await getDb();
    try {
      const resultado = await db.getAllAsync<RegistroType>(
        "SELECT * FROM consumo_diario"
      );
      console.log("Registros obtenidos:", resultado);
      return resultado;
    } catch (error) {
      console.error("Error al obtener registros:", error);
      throw error;
    }
  };

  // Vaciar la tabla registros
  const vaciarTabla = async () => {
    console.log("Vaciando tabla registros...");
    const db = await getDb();
    try {
      await db.execAsync("DELETE FROM consumo_diario;");
      console.log("Tabla registros vaciada exitosamente.");
    } catch (error) {
      console.error("Error al vaciar la tabla registros:", error);
      throw error;
    }
  };

  // Eliminar un registro por ID de la tabla registros
  const eliminarRegistro = async (id: number) => {
    console.log("Eliminando registro con ID:", id);
    const db = await getDb();
    try {
      const result = await db.runAsync(
        "DELETE FROM consumo_diario WHERE id = ?;",
        [id]
      );
      console.log("Registro eliminado, filas afectadas:", result.changes);
      return result;
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      throw error;
    }
  };
  // Obtener todos los registros de consumo diario

  return {
    crearTabla,
    crearTabla2,
    guardarRegistro,
    guardarDosificacion,
    obtenerDosificacionProgramada,
    obtenerTodosRegistros,
    vaciarTabla,
    eliminarRegistro,
  };
}
