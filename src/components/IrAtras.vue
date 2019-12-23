<template>
  <q-btn
    size="sm"
    glossy
    class="full-width"
    @click="IrAtras()"
    label="Atras"
    text-color="white"
    color="grey"
  />
</template>

<script>
export default {
  methods: {
    IrAtras() {
      console.log("Ir Atras");
      this.$router.go(-1);
    }
  }
  // name: 'PageName',
};
</script>

<style scoped></style>
