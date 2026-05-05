/**
 * App.tsx - Aplicativo de Consultas Médicas
 * Versão 3: Componentização
 *
 * Evolução:
 * Aula 1 (31/03) → MVP Simples
 * Aula 2 (07/04) → Integração TypeScript
 * Aula 3 (14/04) → Componentização ← VOCÊ ESTÁ AQUI
 */

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

// Importando a modelagem TypeScript
import { Especialidade } from "./src/types/especialidade";
import { Paciente } from "./src/types/paciente";
import { Medico } from "./src/interfaces/medico";
import { Consulta } from "./src/interfaces/consulta";

// Importando o componente reutilizável
import { ConsultaCard } from "./src/components";

export default function App() {
  // Dados base (simulando o que tínhamos no backend)
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

  // Estado da consulta
  const [consulta, setConsulta] = useState<Consulta>({
    id: 1,
    medico: medico1,
    paciente: paciente1,
    data: new Date(2026, 2, 10), // 10/03/2026
    valor: 350,
    status: "agendada",
    observacoes: "Consulta de rotina",
  });

  /**
   * Funções para manipular a consulta
   *
   * Essas funções serão passadas como props para o componente.
   * O componente não altera o estado diretamente - ele apenas
   * "comunica" ao pai (App) que uma ação foi solicitada.
   */
  function confirmarConsulta() {
    setConsulta({
      ...consulta,
      status: "confirmada",
    });
  }

  function cancelarConsulta() {
    setConsulta({
      ...consulta,
      status: "cancelada",
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Sistema de Consultas</Text>
          <Text style={styles.subtitulo}>Consulta #{consulta.id}</Text>
        </View>

        {/*
          Componente ConsultaCard

          Veja como ficou mais simples!
          Antes: ~100 linhas de JSX no App.tsx
          Agora: 1 componente reutilizável

          Props:
          - consulta: objeto com todos os dados
          - onConfirmar: função a ser chamada ao confirmar
          - onCancelar: função a ser chamada ao cancelar
        */}
        <ConsultaCard
          consulta={consulta}
          onConfirmar={confirmarConsulta}
          onCancelar={cancelarConsulta}
        />

      </ScrollView>
    </View>
  );
}

/**
 * Estilos do App
 *
 * Note que removemos TODOS os estilos do card!
 * Eles agora estão encapsulados no componente ConsultaCard.
 *
 * App.tsx agora só tem estilos de layout geral:
 * - Container principal
 * - Cabeçalho
 * - Rodapé
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },
  scrollContent: {
    padding: 24,
    paddingTop: 72,
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  titulo: {
    fontSize: 34,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
    letterSpacing: 0.35,
  },
  subtitulo: {
    fontSize: 15,
    color: "#475569",
    letterSpacing: 0.15,
  },
  rodape: {
    marginTop: 24,
    padding: 18,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 18,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 4,
  },
  rodapeTexto: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 18,
  },
});