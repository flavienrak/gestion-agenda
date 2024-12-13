<script setup>
defineProps({
  title: { type: String, required: true },
  position: { type: String, default: 'top' },
});
</script>

<template>
  <div class="relative group">
    <slot></slot>
    <div
      :class="[
        'absolute opacity-0 left-1/2 transform -translate-x-1/2 transition-all duration-150 group-hover:opacity-100',
        position === 'top'
          ? 'bottom-full -translate-y-2'
          : 'top-full translate-y-2',
      ]"
    >
      <div
        class="bg-neutral-900/75 text-white text-xs rounded-md py-1.5 px-4 right-0 bottom-full"
      >
        {{ title }}
      </div>
      <svg
        class="absolute text-neutral-900/75 h-2 w-full left-0 top-full"
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
        xml:space="preserve"
      >
        <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
      </svg>
    </div>
  </div>
</template>
