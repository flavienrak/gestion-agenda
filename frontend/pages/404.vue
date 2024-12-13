<template>
  <section class="h-screen flex items-center p-16">
    <div
      class="container flex flex-col items-center justify-center px-5 mx-auto my-8"
    >
      <div class="max-w-md text-center">
        <h2 class="mb-8 font-extrabold text-9xl dark:text-cyan-500">
          <span class="sr-only">Error</span>404
        </h2>
        <p class="text-2xl font-semibold md:text-3xl">
          Ooops! Cette page n'existe pas.
        </p>
        <p class="mt-4 mb-8 dark:text-gray-600">
          Retourner vers la page d'acceuil.
        </p>
        <NuxtLink
          rel="noopener noreferrer"
          to="/"
          class="px-8 py-3 font-semibold rounded-md bg-cyan-500 text-white"
          >Accueil</NuxtLink
        >
      </div>
    </div>
  </section>
</template>
<script setup>
import { useHead } from '@unhead/vue';

useHead({
  title: '404 - Page non trouvé',
  meta: [
    {
      name: 'description',
      content: '404 Page non trouvé sur Gestion Agendas.',
    },
  ],
});
</script>
