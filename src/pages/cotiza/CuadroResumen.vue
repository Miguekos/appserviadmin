<template>
  <div class="full-width">
    <!--    <q-markup-table dark class="bg-indigo-8">-->
    <div>
      <p class="bg-green-7 text-center text-white text-subtitle1">
        Cuadro Resumen
      </p>
    </div>
    <q-markup-table :separator="separator" flat bordered>
      <!-- <thead>
        <tr>
          <th style="font-size: 20px" class="bg-green-4 text-left">
            Cuadro Resumen
          </th>
          <th style="font-size: 20px" class="bg-green-4 text-left"></th>
        </tr>
      </thead>-->
      <tbody>
        <tr>
          <td class="text-left">En confirmacion:</td>
          <td class="text-right">06</td>
        </tr>
        <tr>
          <td class="text-left">Aceptado:</td>
          <td class="text-right">237</td>
        </tr>
        <tr>
          <td class="text-left">Rechazado</td>
          <td class="text-right">262</td>
        </tr>
        <tr>
          <td class="text-left">Listo</td>
          <td class="text-right">305</td>
        </tr>
        <tr>
          <td class="text-left">Total</td>
          <td class="text-right">356</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: null,
      separator: "cell",
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  }
};
</script>
