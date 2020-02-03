<template>
  <div>
    <q-card>
      <q-card-section class="bg-secondary text-white">
        <div class="text-center" style="font-size: 20px">
          Motivos
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          dense
          hide-header
          :data="dataCheck"
          :columns="columns"
          row-key="co_catrci"
          :selected-rows-label="getSelectedString"
          selection="multiple"
          :selected.sync="selected"
        >
        </q-table>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn v-close-popup color="negative">Cerrar</q-btn>
        <q-btn color="positive">Enviar</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["dataCheck"],
  data() {
    return {
      selected: [],
      columns: [
        {
          name: "co_catrci",
          required: true,
          label: "Nro.",
          align: "left",
          field: "co_catrci",
          sortable: true
        },
        {
          name: "no_catrci",
          align: "left",
          label: "Catalogos",
          field: "no_catrci",
          sortable: true
        }
      ],
      data: []
    };
  },
  methods: {
    ...mapActions("clientes", ["listar_catalogos"]),
    getSelectedString() {
      return this.selected.length === 0 ? "" : `${this.selected.length}`;
    }
  },
  async mounted() {}
};
</script>

<style scoped></style>
