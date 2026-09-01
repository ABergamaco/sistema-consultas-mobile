/**
 * =============================================================================
 * COMPONENTE: ConsultaCard
 * =============================================================================
 *
 * Este componente exibe os dados de UMA consulta medica de forma organizada.
 * Mudanca da aula 18.08: formatarData(dataHora: string) + consulta.dataHora.
 *
 * =============================================================================
 */

import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

// Importamos a interface Consulta que criamos na aula passada
// Ela vem de src/interfaces/ porque e usada em VARIOS lugares
import { Consulta } from "../interfaces/consulta";

type ConsultaCardProps = {
  // A consulta que queremos exibir (OBRIGATORIA)
  consulta: Consulta;

  // Funcao chamada quando o usuario clica em "Confirmar" (OPCIONAL)
  onConfirmar?: () => void;

  // Funcao chamada quando o usuario clica em "Cancelar" (OPCIONAL)
  onCancelar?: () => void;
};

export default function ConsultaCard({
  consulta,
  onConfirmar,
  onCancelar,
}: ConsultaCardProps) {
  // Formata um numero para moeda brasileira (R$ 150,00)
  function formatarValor(valor: number): string {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // Formata uma string ISO do backend no padrao brasileiro (25/03/2026 as 09:00)
  function formatarData(dataHora: string): string {
    const data = new Date(dataHora);
    const dia = data.toLocaleDateString("pt-BR");
    const hora = data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${dia} as ${hora}`;
  }

  return (
    <View style={styles.card}>
      {/* BADGE DO STATUS */}
      <View
        style={[
          styles.statusBadge,
          consulta.status === "confirmada" && styles.statusConfirmada,
          consulta.status === "cancelada" && styles.statusCancelada,
        ]}
      >
        <Text style={styles.statusTexto}>
          {consulta.status.toUpperCase()}
        </Text>
      </View>

      {/* SECAO: MEDICO */}
      <View style={styles.secao}>
        <Text style={styles.label}>Medico</Text>
        <Text style={styles.valor}>{consulta.medico.nome}</Text>
        <Text style={styles.info}>CRM: {consulta.medico.crm}</Text>
        <Text style={styles.info}>{consulta.medico.especialidade.nome}</Text>
      </View>

      {/* SECAO: PACIENTE */}
      <View style={styles.secao}>
        <Text style={styles.label}>Paciente</Text>
        <Text style={styles.valor}>{consulta.paciente.nome}</Text>
        <Text style={styles.info}>CPF: {consulta.paciente.cpf}</Text>
        <Text style={styles.info}>Email: {consulta.paciente.email}</Text>
        {consulta.paciente.telefone && (
          <Text style={styles.info}>Tel: {consulta.paciente.telefone}</Text>
        )}
      </View>

      {/* SECAO: DADOS DA CONSULTA */}
      <View style={styles.secao}>
        <Text style={styles.label}>Dados da Consulta</Text>
        <Text style={styles.valor}>Data: {formatarData(consulta.dataHora)}</Text>
        <Text style={styles.valor}>
          Valor: {formatarValor(consulta.valor)}
        </Text>
        {consulta.observacoes && (
          <Text style={styles.observacoes}>{consulta.observacoes}</Text>
        )}
      </View>

      {/* BOTOES DE ACAO (props opcionais + callbacks) */}
      <View style={styles.acoes}>
        {consulta.status === "agendada" && (
          <>
            {onConfirmar && (
              <View style={styles.botaoContainer}>
                <Button
                  title="Confirmar Consulta"
                  onPress={onConfirmar}
                  color="#4CAF50"
                />
              </View>
            )}
            {onCancelar && (
              <View style={styles.botaoContainer}>
                <Button
                  title="Cancelar Consulta"
                  onPress={onCancelar}
                  color="#F44336"
                />
              </View>
            )}
          </>
        )}

        {consulta.status === "confirmada" && (
          <View style={styles.mensagem}>
            <Text style={styles.mensagemTexto}>
              Consulta confirmada com sucesso!
            </Text>
          </View>
        )}

        {consulta.status === "cancelada" && (
          <View style={styles.mensagemCancelada}>
            <Text style={styles.mensagemTexto}>Consulta cancelada</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Container principal do card
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    // Sombra no iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    // Sombra no Android
    elevation: 5,
  },

  // Badge de status (agendada, confirmada, cancelada)
  statusBadge: {
    backgroundColor: "#FFA500", // Laranja (padrao para "agendada")
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  statusConfirmada: {
    backgroundColor: "#4CAF50", // Verde
  },
  statusCancelada: {
    backgroundColor: "#F44336", // Vermelho
  },
  statusTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  // Secoes do card (medico, paciente, dados)
  secao: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },

  // Labels das secoes
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#79059C",
    marginBottom: 8,
  },

  // Valores exibidos
  valor: {
    fontSize: 18,
    color: "#333",
    marginBottom: 4,
  },

  // Informacoes complementares (CRM, CPF, email, etc)
  info: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },

  // Observacoes (texto em italico)
  observacoes: {
    fontSize: 14,
    color: "#555",
    fontStyle: "italic",
    marginTop: 8,
  },

  // Container das acoes (botoes e mensagens)
  acoes: {
    marginTop: 10,
  },

  // Espacamento entre botoes
  botaoContainer: {
    marginBottom: 12,
  },

  // Mensagem de sucesso (verde)
  mensagem: {
    backgroundColor: "#E8F5E9",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },

  // Mensagem de cancelamento (vermelho)
  mensagemCancelada: {
    backgroundColor: "#FFEBEE",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#F44336",
  },
  mensagemTexto: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },
});
