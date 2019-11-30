<template>
  <div class="full-width">
    <!--    <q-markup-table dark class="bg-indigo-8">-->
    <div>
      <p class="bg-secondary shadow-5 text-center text-white text-subtitle1">
        Resumen
      </p>
    </div>
    <q-markup-table :separator="separator" flat dense bordered>
      <tbody>
        <tr>
          <td class="bg-primary text-white text-left">Semaforo</td>
          <td class="bg-primary text-white text-right">Cantidad</td>
        </tr>
        <tr>
          <td class="text-left">Aceptado:</td>
          <td class="text-right">{{ resumen.aceptado }}</td>
        </tr>
        <tr>
          <td class="text-left">Rechazado</td>
          <td class="text-right">{{ resumen.rechazado }}</td>
        </tr>
        <tr>
          <td class="text-left">Listo</td>
          <td class="text-right">{{ resumen.listo }}</td>
        </tr>
        <tr>
          <td class="text-left">Total</td>
          <td class="text-right">{{ resumen.total }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      resumen: {
        confirmacion: 6,
        aceptado: 12,
        rechazado: 0,
        listo: 12,
        total: 18
      },
      model: null,
      separator: "cell",
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  created() {
    console.log("se cargo el created de resumen");
    // this.$q.loading.show({ delay: 400 });
  }
};
</script>
