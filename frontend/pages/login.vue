<script setup>
import LoginComponent from '~/components/LoginComponent.vue';
import HeaderComponent from '~/components/common/HeaderComponent.vue';

useHead({
  title: 'Connexion',
  meta: [
    {
      name: 'description',
      content: 'Se connecter sur Gestion Agendas.',
    },
  ],
});
</script>

<template>
  <div class="h-screen w-full flex flex-col items-center justify-evenly">
    <header-component />
    <login-component />
  </div>
</template>
