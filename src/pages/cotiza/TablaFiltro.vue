<template>
  <div class="full-width">
    <q-markup-table :separator="separator" flat bordered>
      <thead>
        <tr>
          <th style="font-size: 20px" class="bg-grey-4 text-left">Filtros</th>
          <th style="font-size: 20px" class="bg-grey-4 text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">Estados</td>
          <td class="text-right">
            <q-select
              standout="bg-teal text-white"
              v-model="model"
              :options="options"
              dense
              label="Estados"
            />
          </td>
        </tr>
        <tr>
          <td class="text-left">Fecha Inicio</td>
          <td class="text-right">
            <q-input
              dense
              standout="bg-teal text-white"
              type="date"
              v-model="fechainicio"
            />
          </td>
        </tr>
        <tr>
          <td class="text-left">Fecha Fin</td>
          <td class="text-right">
            <q-input
              dense
              standout="bg-teal text-white"
              type="date"
              v-model="fechafin"
            />
          </td>
        </tr>
        <tr>
          <td class="text-left"></td>
          <td class="text-center">
            <div class="row justify-around">
              <div>
                <q-btn
                  :size="size[1]"
                  :loading="loading1"
                  color="secondary"
                  @click="simulateProgress(1)"
                  label="Filtrar"
                />
              </div>
              <div>
                <q-btn
                  :size="size[1]"
                  :loading="loading2"
                  color="positive"
                  @click="crearCotiza(2)"
                  label="nuevo req."
                />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fechainicio: "",
      fechafin: "",
      cliente: "",
      size: ["xs", "sm", "md", "lg", "xl"],
      loading1: false,
      loading2: false,
      model: null,
      separator: "cell",
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },
  methods: {
    crearCotiza() {
      this.$router.push("/cotiza/create");
    },
    simulateProgress(number) {
      // we set loading state
      this[`loading${number}`] = true;
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this[`loading${number}`] = false;
      }, 3000);
    }
  }
};
</script>
