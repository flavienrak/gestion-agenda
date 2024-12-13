<script setup>
useHead({
  title: 'Chargement',
  meta: [
    {
      name: 'description',
      content: 'Chargement de la page Gestion Agendas.',
    },
  ],
});
</script>
<template>
  <div
    class="fixed top-0 left-0 bg-white/50 min-h-screen h-full w-full flex justify-center items-center"
  >
    <div
      class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-cyan-500"
    ></div>
    <div class="relative h-10 w-10">
      <NuxtImg
        :src="'/logo.jpg'"
        alt="Logo"
        class="object-cover absolute top-0 left-0 w-full h-full rounded-md"
      />
    </div>
  </div>
</template>
