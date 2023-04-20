<script setup>

import humanize from '../helpers/humanize';

defineProps({
  title: {
    type: String,
    required: true
  }
})

</script>

<template>
  <h1 class="heading">{{ humanize(title) }}</h1>
</template>
