<script setup>
import { uidService } from '~/services/auth';
import { notLoggedPaths, loggedPaths } from '~/utils/paths';
import SpinnerComponent from '~/components/common/SpinnerComponent.vue';
import { useUserStore } from '~/stores/user.js';

const isLoading = ref(true);
const route = useRoute();
const userStore = useUserStore();

onMounted(async () => {
  try {
    const { data } = await uidService();
    if (data.user) {
      userStore.setUser(data.user);
      if (notLoggedPaths.includes(route.name)) {
        return navigateTo('/');
      }
    } else {
      if (loggedPaths.includes(route.name)) {
        return navigateTo('/login');
      }
    }
  } catch (error) {
    return;
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen text-neutral-900 bg-white">
    <spinner-component v-if="isLoading" />
    <NuxtPage />
  </div>
</template>
