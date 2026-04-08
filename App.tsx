import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

// Importações mantidas conforme sua estrutura
import { Especialidade } from "./src/types/especialidade";
import { Paciente } from "./src/types/paciente";
import { Medico } from "./src/interfaces/medico";
import { Consulta } from "./src/interfaces/consulta";

export default function App() {
  const cardiologia: Especialidade = {
    id: 1,
    nome: "Cardiologia",
    descricao: "Cuidados com o coração",
  };

  const medico1: Medico = {
    id: 1,
    nome: "Dr. Roberto Silva",
    crm: "CRM12345",
    especialidade: cardiologia,
    ativo: true,
  };

  const paciente1: Paciente = {
    id: 1,
    nome: "Carlos Andrade",
    cpf: "123.456.789-00",
    email: "carlos@email.com",
    telefone: "(11) 98765-4321",
  };

  const [consulta, setConsulta] = useState<Consulta>({
    id: 1,
    medico: medico1,
    paciente: paciente1,
    data: new Date(2026, 2, 10),
    valor: 350,
    status: "agendada",
    observacoes: "Consulta de rotina para acompanhamento de pressão arterial.",
  });

  function confirmarConsulta() {
    setConsulta({ ...consulta, status: "confirmada" });
  }

  function cancelarConsulta() {
    setConsulta({ ...consulta, status: "cancelada" });
  }

  function formatarValor(valor: number): string {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function formatarData(data: Date): string {
    return data.toLocaleDateString("pt-BR");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Minimalista */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Detalhes da</Text>
          <Text style={styles.titulo}>Consulta Médica</Text>
        </View>

        {/* Card Principal */}
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.protocolo}>#{consulta.id.toString().padStart(4, '0')}</Text>
            <View style={[
              styles.statusBadge,
              consulta.status === "confirmada" && styles.statusConfirmada,
              consulta.status === "cancelada" && styles.statusCancelada,
            ]}>
              <Text style={styles.statusTexto}>{consulta.status.toUpperCase()}</Text>
            </View>
          </View>

          {/* Seção Médico */}
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}><Text>👨‍⚕️</Text></View>
            <View>
              <Text style={styles.label}>Profissional</Text>
              <Text style={styles.valor}>{consulta.medico.nome}</Text>
              <Text style={styles.subValor}>{consulta.medico.especialidade.nome} • {consulta.medico.crm}</Text>
            </View>
          </View>

          {/* Seção Paciente */}
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}><Text>👤</Text></View>
            <View>
              <Text style={styles.label}>Paciente</Text>
              <Text style={styles.valor}>{consulta.paciente.nome}</Text>
              <Text style={styles.subValor}>{consulta.paciente.cpf}</Text>
            </View>
          </View>

          {/* Seção Horário e Valor */}
          <View style={styles.divider} />
          
          <View style={styles.gridInfo}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Data</Text>
              <Text style={styles.valorCompacto}>{formatarData(consulta.data)}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Investimento</Text>
              <Text style={styles.valorCompacto}>{formatarValor(consulta.valor)}</Text>
            </View>
          </View>

          {consulta.observacoes && (
            <View style={styles.obsBox}>
              <Text style={styles.obsTexto}>"{consulta.observacoes}"</Text>
            </View>
          )}
        </View>

        {/* Botões de Ação com Estilo Customizado */}
        <View style={styles.areaAcoes}>
          {consulta.status === "agendada" && (
            <>
              <TouchableOpacity style={styles.btnConfirmar} onPress={confirmarConsulta}>
                <Text style={styles.btnTexto}>Confirmar Agendamento</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.btnCancelar} onPress={cancelarConsulta}>
                <Text style={[styles.btnTexto, { color: '#FF5252' }]}>Cancelar</Text>
              </TouchableOpacity>
            </>
          )}

          {consulta.status === "confirmada" && (
            <View style={styles.feedbackSucesso}>
              <Text style={styles.feedbackTexto}>Tudo pronto! Te vemos em breve.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Azul acinzentado bem claro
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
  },
  greeting: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },
  titulo: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1E293B",
  },
  mainCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  protocolo: {
    fontSize: 14,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 1,
  },
  statusBadge: {
    backgroundColor: "#F59E0B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusConfirmada: { backgroundColor: "#10B981" },
  statusCancelada: { backgroundColor: "#EF4444" },
  statusTexto: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "900",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: 44,
    height: 44,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94A3B8",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  valor: {
    fontSize: 17,
    fontWeight: "700",
    color: "#334155",
  },
  subValor: {
    fontSize: 13,
    color: "#64748B",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 12,
  },
  gridInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gridItem: {
    flex: 1,
  },
  valorCompacto: {
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
  },
  obsBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  obsTexto: {
    fontSize: 13,
    color: "#64748B",
    fontStyle: "italic",
    lineHeight: 20,
  },
  areaAcoes: {
    marginTop: 32,
  },
  btnConfirmar: {
    backgroundColor: "#0F172A",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  btnCancelar: {
    paddingVertical: 12,
    alignItems: "center",
  },
  btnTexto: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  feedbackSucesso: {
    backgroundColor: "#ECFDF5",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  feedbackTexto: {
    color: "#065F46",
    textAlign: "center",
    fontWeight: "600",
  }
});