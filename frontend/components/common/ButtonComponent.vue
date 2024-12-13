<script setup>
defineProps({
  label: { type: String, required: false },
  size: { type: String, required: false },
});
</script>

<template>
  <button
    :class="[
      'w-full bg-cyan-500 text-white rounded-lg p-2 font-semibold inline-flex justify-center items-center gap-2',
      size === 'sm' ? 'text-sm' : '',
    ]"
  >
    <slot></slot>
    {{ label }}
  </button>
</template>
