import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { logo_image } from "@/app/utils/constants";
import { colors } from "@/app/utils/colors";
import { fontFamilies } from "@/app/utils/fontfamily";
import useDatabase from "@/app/hooks/useDatabase";
import { RegistroType } from "@/app/types/semana";
import { useWebSocketContext } from "@/app/context/WebsocketProvider";

export default function DailyConsumptionScreen() {
  const [loading, setLoading] = useState(true);
  const { crearTabla, obtenerTodosRegistros } = useDatabase();

  const { registros } = useWebSocketContext();

  useEffect(() => {
    cargarConsumoDiario();
  }, []);

  const cargarConsumoDiario = async () => {
    try {
      setLoading(true);
      // Crear la tabla si no existe
      await crearTabla();

      // Obtener los datos reales de la base de datos
      const datos = await obtenerTodosRegistros();
    } catch (error) {
      console.error("Error al cargar consumo diario:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (timestamp: string) => {
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString("es-ES", { month: "long", day: "numeric" }) +
      " " +
      date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <View style={{ alignItems: "center", marginTop: 20, marginBottom: 30 }}>
        <Text
          style={{
            fontFamily: fontFamilies.MONTSERRAT.bold,
            fontSize: 24,
            color: colors.primary,
            marginTop: 20,
          }}
        >
          Consumo mensual de{" "}
          {new Date().toLocaleDateString("es-ES", { month: "long" })}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.primary,
          paddingVertical: 15,
          paddingHorizontal: 5,
          marginHorizontal: 20,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            flex: 1,
            fontFamily: fontFamilies.MONTSERRAT.bold,
            color: "white",
            textAlign: "center",
          }}
        >
          Fecha
        </Text>
        <Text
          style={{
            flex: 1,
            fontFamily: fontFamilies.MONTSERRAT.bold,
            color: "white",
            textAlign: "center",
          }}
        >
          Cantidad (Kgr)
        </Text>
        <Text
          style={{
            flex: 1,
            fontFamily: fontFamilies.MONTSERRAT.bold,
            color: "white",
            textAlign: "center",
          }}
        >
          Semana
        </Text>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 50,
            }}
          >
            <Text
              style={{
                fontFamily: fontFamilies.MONTSERRAT.medium,
                fontSize: 16,
                color: "#666",
              }}
            >
              Cargando datos...
            </Text>
          </View>
        ) : registros.length > 0 ? (
          registros.map((item) => (
            <View
              key={item.id}
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderRadius: 10,
                marginBottom: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 3,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontFamily: fontFamilies.MONTSERRAT.medium,
                  textAlign: "center",
                }}
              >
                {formatearFecha(item.fecha)}
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontFamily: fontFamilies.MONTSERRAT.medium,
                  textAlign: "center",
                  color: colors.primary,
                  fontWeight: "bold",
                }}
              >
                {item.cantidad}
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontFamily: fontFamilies.MONTSERRAT.medium,
                  textAlign: "center",
                }}
              >
                {item.semana}
              </Text>
            </View>
          ))
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 50,
            }}
          >
            <Text
              style={{
                fontFamily: fontFamilies.MONTSERRAT.medium,
                fontSize: 16,
                color: "#666",
                textAlign: "center",
              }}
            >
              No hay registros de consumo mensual.
            </Text>
          </View>
        )}
      </ScrollView>

      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          margin: 20,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontFamily: fontFamilies.MONTSERRAT.bold,
            fontSize: 18,
            color: colors.primary,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Total Consumido
        </Text>
        <Text
          style={{
            fontFamily: fontFamilies.MONTSERRAT.bold,
            fontSize: 24,
            color: colors.primary,
            textAlign: "center",
          }}
        >
          {registros.reduce((total, item) => total + item.cantidad, 0).toFixed(2)} Kgr
        </Text>
      </View>
    </SafeAreaView>
  );
}
