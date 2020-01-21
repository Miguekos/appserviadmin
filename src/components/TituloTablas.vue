<template>
  <q-item class="shadow-5 bg-secondary text-white">
    <q-item-section>
      <q-item-label style="font-size: 20px">
        {{ titulo }}
      </q-item-label>
    </q-item-section>
    <q-item-section>
      <div class="text-right">
        <Atras />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ["titulo"],
  name: "TituloTablas",
  methods: {
    atras() {
      console.log("Ir Atras");
      this.$router.go(-1);
    }
  },
  components: {
    Atras: () => import("./IrAtras")
  }
};
</script>

<style scoped></style>
