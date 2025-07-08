<script setup lang="ts">
defineProps<{
  inputId: string
  label: string
  required?: boolean
}>()
</script>

<template>
  <label :for="inputId"
    class="pointer-events-none absolute left-0 top-0.5 text-highlighted text-xs px-1.5 transition-all peer-focus:top-0.5 peer-focus:text-highlighted peer-focus:text-xs peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-4.5">
    <span class="inline-flex px-1">{{ label }}<span v-if="required" :aria-hidden="true">&#x2A;</span></span>
  </label>
</template>
