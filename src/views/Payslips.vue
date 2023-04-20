<script setup>

import humanize from '../helpers/humanize';
import Payslips from '../components/Payslips.vue';

defineProps({
  title: {
    type: String,
    required: true
  }
})

</script>

<template>
  <h1 class="heading">{{ humanize(title) }}</h1>
  <Payslips />
</template>