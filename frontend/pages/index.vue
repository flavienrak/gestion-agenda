<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import CardComponent from '~/components/common/CardComponent.vue';
import HeaderComponent from '~/components/common/HeaderComponent.vue';
import TooltipComponent from '~/components/common/TooltipComponent.vue';
import PaginationComponent from '~/components/common/PaginationComponent.vue';
import AgendaComponent from '~/components/AgendaComponent.vue';
import PopupComponent from '~/components/PopupComponent.vue';

import { useUserStore } from '~/stores/user.js';
import { useAgendaStore } from '~/stores/agendas';
import { getAgendasService } from '~/services/agendas.js';

const isLoading = ref(true);
const agendaStore = useAgendaStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const newAgenda = ref(false);
const editAgenda = ref(false);

const fetchAgendas = async () => {
  try {
    const { data } = await getAgendasService();
    agendaStore.setAgendas(data.agendas);
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    return;
  }
};

watch(
  () => userStore.user.id,
  (newValue) => {
    if (newValue) {
      fetchAgendas();
    }
  }
);

watch(
  () => route.query.agenda,
  (newParam) => {
    if (newParam === 'new') {
      newAgenda.value = true;
    } else {
      newAgenda.value = false;
    }
  },
  { immediate: true }
);

watch(
  () => route.query.edit,
  (newParam) => {
    if (parseInt(newParam)) {
      editAgenda.value = true;
    } else {
      editAgenda.value = false;
    }
  },
  { immediate: true }
);

const close = () => {
  newAgenda.value = false;

  router.push('/');
};
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div class="max-w-[50rem] w-full p-10 flex flex-col gap-10">
      <div class="flex justify-between w-full">
        <header-component />
        <tooltip-component
          v-if="userStore.user.id"
          :title="userStore.user.email"
        >
          <label
            class="relative flex justify-center items-center p-2 h-10 w-10 rounded-full bg-cyan-500 text-white font-bold text-xl cursor-pointer"
            >{{ userStore.user.name.charAt(0) }}</label
          >
        </tooltip-component>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-semibold">Liste des agendas</h1>
          <div class="w-28">
            <NuxtLink
              to="?agenda=new"
              class="w-full text-sm bg-cyan-500 text-white rounded-lg p-2 font-semibold inline-flex items-center gap-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-plus"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Nouveau
            </NuxtLink>
          </div>
        </div>

        <template v-if="agendaStore.agendas.length > 0">
          <ul
            v-for="item in agendaStore.agendas"
            :key="item.id"
            class="flex flex-col gap-4"
          >
            <li>
              <div
                class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <card-component
                  :key="'agenda-' + item.id"
                  :id="item.id"
                  :title="item.title"
                  :date="item.start_date"
                  :description="item.description"
                />
              </div>
            </li>
          </ul>
          <!-- <pagination-component /> -->
        </template>

        <popup-component :visible="newAgenda" @close="close">
          <agenda-component @close="close" />
        </popup-component>

        <popup-component :visible="editAgenda" @close="close">
          <agenda-component
            @close="close"
            :agendaId="parseInt(route.query.edit)"
          />
        </popup-component>
      </div>
    </div>
  </div>
</template>
