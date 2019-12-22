<template>
  <q-btn
    size="sm"
    glossy
    class="full-width"
    @click="atras()"
    label="Atras"
    text-color="white"
    color="grey"
  />
</template>

<script>
export default {
  methods: {
    atras() {
      console.log("Ir Atras");
      this.$router.go(-1);
    }
  }
  // name: 'PageName',
};
</script>

<style scoped></style>
