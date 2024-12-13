<script setup>
const props = defineProps({
  agendaId: { type: [String, Number] },
});

import { ref, watch } from 'vue';

import InputComponent from '~/components/common/InputComponent.vue';
import ButtonComponent from '~/components/common/ButtonComponent.vue';

import {
  createAgendasService,
  updategendasService,
} from '~/services/agendas.js';
import { useAgendaStore } from '~/stores/agendas.js';

import DateTimePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import * as yup from 'yup';

const isSubmit = ref(false);
const actualAgenda = ref(null);
const agendaStore = useAgendaStore();

watch(
  [props.agendaId, agendaStore.agendas],
  () => {
    if (agendaStore.agendas.length > 0) {
      actualAgenda.value = agendaStore.agendas.find(
        (a) => a.id === props.agendaId
      );
    }
  },
  { immediate: true, deep: true }
);

const initialValues = reactive({
  title: actualAgenda.value?.title ? actualAgenda.value.title : '',
  description: actualAgenda.value?.description
    ? actualAgenda.value.description
    : '',
  start_date: actualAgenda.value?.start_date
    ? new Date(actualAgenda.value.start_date)
    : new Date(),
  end_date: actualAgenda.value?.end_date
    ? new Date(actualAgenda.value.end_date)
    : new Date(),
});

const validationSchema = yup.object({
  title: yup.string().required('Titre requis'),
  description: yup.string().required('Description requise'),
  start_date: yup.string().required('Start_date requis'),
  end_date: yup.string().required('end_date requis'),
});

const { handleSubmit, resetForm, setErrors, validate } = useForm({
  validationSchema,
  initialValues,
});

const { value: title, errorMessage: titleError } = useField('title');
const { value: description, errorMessage: descriptionError } =
  useField('description');
const { value: start_date, errorMessage: start_dateError } =
  useField('start_date');
const { value: end_date, errorMessage: end_dateError } = useField('end_date');

watch([title, description, start_date, end_date], () => {
  isSubmit.value = false;
});

const emit = defineEmits(['close']);

function emitClose() {
  emit('close');
}

const submitAgenda = async () => {
  isSubmit.value = true;
  const validateData = await validate();

  if (validateData.valid) {
    handleSubmit(async (values) => {
      try {
        if (props.agendaId) {
          const { data } = await updategendasService(props.agendaId, values);
          agendaStore.updateAgenda(data);
        } else {
          const { data } = await createAgendasService(values);
          agendaStore.addAgenda(data);
        }
        resetForm();
        emitClose();
        window.location = '/';
      } catch (error) {
        console.log('error:', error);
        return;
      }
    })();
  }
};
</script>

<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-xl font-semibold">Nouvel agenda</h1>
    <VeeForm @submit="submitAgenda" class="divide-y divide-gray-200">
      <div class="text-base leading-6 space-y-6 sm:text-lg sm:leading-7">
        <input-component
          label="Titre"
          v-model="title"
          placeholder=" "
          autocomplete="off"
          :error="isSubmit ? titleError : ''"
        />
        <input-component
          as="textarea"
          label="Description"
          v-model="description"
          placeholder=" "
          type="description"
          autocomplete="off"
          rows="3"
          :error="isSubmit ? descriptionError : ''"
        />
        <div class="flex gap-5">
          <div class="flex flex-col gap-1">
            <label class="text-base">Date de début</label>
            <date-time-picker
              v-model="start_date"
              placeholder="Sélectionner une date"
              :error="isSubmit ? descriptionError : ''"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-base">Date de fin</label>
            <date-time-picker
              v-model="end_date"
              placeholder="Sélectionner une date"
              :error="isSubmit ? descriptionError : ''"
            />
          </div>
        </div>
        <div class="flex justify-between">
          <div></div>
          <div class="w-24">
            <button-component label="Ajouter" type="submit" />
          </div>
        </div>
      </div>
    </VeeForm>
  </div>
</template>
