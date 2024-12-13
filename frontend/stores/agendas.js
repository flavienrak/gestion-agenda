import { defineStore } from 'pinia';

export const useAgendaStore = defineStore('agendas', {
  state: () => ({
    agendas: [],
  }),
  actions: {
    setAgendas(agendas) {
      this.agendas = agendas;
    },
    addAgenda(agenda) {
      this.agendas = [agenda, ...this.agendas];
    },
    updateAgenda(agenda) {
      this.agendas = this.agendas.map((a) =>
        a.id === agenda.id ? { ...a, ...agenda } : a
      );
    },
    deleteAgenda(agenda) {
      this.agendas = this.agendas.filter((a) => a.id !== agenda.id);
    },
  },
});
