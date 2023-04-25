<script setup>
import { defineAsyncComponent } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
});

const icon = defineAsyncComponent(() => import(`../assets/icons/${props.name}.svg`));
</script>

<template>
  <component :is="icon" />
</template>
