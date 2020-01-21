<template>
  <div class="full-width">
    <div>
      <p class="bg-secondary dense shadow-5 text-center text-white">
        Cuadro Resumen
      </p>
    </div>
    <q-table
      hide-header
      hide-bottom
      dense
      :data="data"
      :columns="columns"
      row-key="no_estreq"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="no_estreq" :props="props">
            <q-badge :style="coloreando(props.row.no_colhex)">
              {{ props.row.no_estreq }}
            </q-badge>
          </q-td>
          <q-td key="ca_estreq" :props="props">
            {{ props.row.ca_estreq }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      columns: [
        {
          name: "no_estreq",
          required: true,
          label: "Dessert (100g serving)",
          align: "left",
          field: "no_estreq",
          sortable: true
        },
        {
          name: "ca_estreq",
          align: "center",
          label: "Calories",
          field: "ca_estreq",
          sortable: true
        }
      ],
      data: []
    };
  },
  methods: {
    ...mapActions("example", ["cuadro_resumen_estado_requerimiento"]),
    coloreando(arg) {
      console.log(arg);
      return `background-color: ${arg}`;
    }
  },
  async mounted() {
    this.data = await this.cuadro_resumen_estado_requerimiento();
  }
};
</script>
