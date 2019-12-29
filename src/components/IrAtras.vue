<template>
  <q-btn
    size="sm"
    icon="arrow_back"
    @click="IrAtras()"
    label="Atras"
    text-color="white"
    color="black"
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
