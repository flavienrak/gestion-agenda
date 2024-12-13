<template>
  <div class="relative flex flex-col gap-2">
    <component
      :is="as"
      :id="label"
      :name="label"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :value="modelValue"
      :rows="rows"
      @change="updateValue"
      :class="[
        'peer placeholder-transparent w-full border-b-2 border-gray-200 focus:outline-none focus:borer-rose-600',
        as === 'input' ? 'h-10' : 'resize-none',
      ]"
    />
    <label
      :for="label"
      :class="[
        'absolute left-0 -top-3.5 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-neutral-500 peer-focus:text-sm',
      ]"
      >{{ label }}</label
    >
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
  </div>
</template>
<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  autocomplete: {
    type: String,
    default: 'on',
  },
  error: {
    type: String,
    default: '',
  },
  as: {
    type: String,
    default: 'input',
  },
  rows: {
    type: [String, Number],
  },
});

const emit = defineEmits(['update:modelValue']);
const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>
