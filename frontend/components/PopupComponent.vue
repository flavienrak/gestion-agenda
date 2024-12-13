<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

function emitClose() {
  emit('close');
}
</script>

<template>
  <div v-if="visible">
    <div
      class="fixed top-0 left-0 w-full min-h-screen h-full bg-black/50 flex justify-center items-center"
    >
      <div class="bg-white p-5 rounded-xl relative w-full max-w-[30rem]">
        <slot></slot>
        <i
          @click="emitClose"
          class="absolute top-3 right-3 p-2 cursor-pointer rounded-full flex justify-center items-center h-10 w-10 bg-cyan-500/10 hover:bg-cyan-500/50 transition-all duration-150"
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
            class="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </i>
      </div>
    </div>
  </div>
</template>
