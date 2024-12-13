<script setup>
import { deleteAgendasService } from '~/services/agendas';
import { useAgendaStore } from '~/stores/agendas';

const agendaStore = useAgendaStore();

defineProps({
  id: { type: [Number, String] },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
});

const deleteAgenda = async (agendaId) => {
  const { data } = await deleteAgendasService(agendaId);
  agendaStore.deleteAgenda(data);
  window.location.reload();
};
</script>

<template>
  <div
    class="w-full bg-white p-4 rounded-md border border-slate-200 group-odd:"
  >
    <div class="flex items-center justify-between space-x-2 mb-1">
      <div class="font-bold text-slate-900">{{ title }}</div>
      <time class="text-xs font-medium text-cyan-500">{{ date }}</time>
    </div>
    <div class="text-sm">
      {{ description }}
    </div>
    <div
      class="flex items-center justify-between pt-2 opacity-0 group-hover:opacity-100 transition-all duration-150"
    >
      <div></div>
      <div class="flex items-center gap-2">
        <NuxtLink :to="`?edit=${id}`">
          <i
            class="relative bg-blue-500/50 rounded-full p-2 flex justify-center items-center text-white cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-pencil-line"
            >
              <path d="M12 20h9" />
              <path
                d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"
              />
              <path d="m15 5 3 3" />
            </svg>
          </i>
        </NuxtLink>

        <i
          @click="deleteAgenda(id)"
          class="relative bg-red-500/50 rounded-full p-2 flex justify-center items-center text-white cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-trash"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </i>
      </div>
    </div>
  </div>
</template>
