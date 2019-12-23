<template>
  <p class="bg-secondary glossy shadow-5 text-center text-white text-subtitle1">
    {{ titulo }}
  </p>
</template>

<script>
export default {
  props: ["titulo"],
  name: "TituloTablas"
};
</script>

<style scoped></style>
