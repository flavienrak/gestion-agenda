<script setup>
import { ref, watch } from 'vue';
import { useHead } from '@unhead/vue';
import InputComponent from './common/InputComponent.vue';
import CheckBoxComponent from './common/CheckBoxComponent.vue';
import ButtonComponent from './common/ButtonComponent.vue';
import { useForm, useField } from 'vee-validate';

import { loginService } from '~/services/auth.js';

import * as yup from 'yup';

const isSubmit = ref(false);

useHead({
  title: 'Connexion',
  meta: [
    {
      name: 'description',
      content: 'Se connecter sur Gestion Agendas.',
    },
  ],
});

const initialValues = reactive({ email: '', password: '', remember: true });

const validationSchema = yup.object({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup
    .string()
    .min(6, 'Mot de passe incorrect')
    .required('Mot de passe requis'),
  remember: yup.boolean(),
});

const { handleSubmit, resetForm, setErrors, validate } = useForm({
  validationSchema,
  initialValues,
});

const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');
const { value: remember } = useField('remember', 'checkbox');

watch([email, password, remember], () => {
  isSubmit.value = false;
});

const login = async () => {
  isSubmit.value = true;
  const validateData = await validate();

  if (validateData.valid) {
    handleSubmit(async (values) => {
      try {
        await loginService(values);
        resetForm();
        window.location = '/';
      } catch (error) {
        const data = error?.response?.data;
        if (data?.userNotFound) {
          setErrors({ email: 'Email inconnu' });
        } else if (data?.incorrectPassword) {
          setErrors({ password: 'Mot de passe incorrect' });
        }
      }
    })();
  }
};
</script>

<template>
  <div class="py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
      ></div>
      <div
        class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
      >
        <div class="max-w-md mx-auto">
          <div>
            <h1 class="text-3xl font-semibold">Connexion</h1>
          </div>
          <VeeForm @submit="login" class="divide-y divide-gray-200">
            <div
              class="py-8 text-base leading-6 space-y-6 sm:text-lg sm:leading-7"
            >
              <input-component
                label="Email"
                v-model="email"
                placeholder=" "
                autocomplete="off"
                :error="isSubmit ? emailError : ''"
              />
              <input-component
                label="Mot de passe"
                v-model="password"
                placeholder=" "
                type="password"
                autocomplete="off"
                :error="isSubmit ? passwordError : ''"
              />
              <check-box-component
                label="Se souvenir de moi"
                v-model="remember"
              />
              <button-component label="Se connecter" type="submit" />
            </div>
          </VeeForm>
        </div>
      </div>
    </div>
  </div>
</template>
