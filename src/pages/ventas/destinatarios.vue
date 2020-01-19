<template>
  <div>
    <q-card>
      <q-card-section class="q-pa-md">
        <q-select
          v-model="clienteBuscar"
          :options="dataCliente"
          option-label="no_client"
          option-value="co_client"
          emit-value
          map-options
          label="Cliente"
          dense
          options-dense
        />
      </q-card-section>
      <q-card-section class="q-pa-md">
        <q-table
          dense
          title="Destinatarios"
          :data="dataContactos"
          :columns="columns1"
          row-key="co_percon"
          :selected-rows-label="getSelectedString"
          selection="multiple"
          :selected.sync="selected"
        >
        </q-table>
      </q-card-section>

      <q-card-actions class="justify-around">
        <q-btn flat icon="add" label="Anadir" color="primary"> </q-btn>
        <q-btn flat icon="email" label="Enviar" color="primary"> </q-btn>
      </q-card-actions>

      <q-separator />

      <q-card-section>
        <q-table
          dense
          title=""
          :data="data"
          :columns="columns2"
          row-key="name"
          binary-state-sort
          :selected-rows-label="getSelectedString"
          selection="multiple"
          :selected.sync="selected"
        >
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      selected: [],
      clienteBuscar: null,
      columns1: [
        {
          name: "co_percon",
          label: "Nro.",
          align: "left",
          field: "co_percon",
          sortable: true
        },
        {
          name: "no_percon",
          align: "left",
          label: "Contacto",
          field: "no_percon",
          sortable: true
        },
        {
          name: "no_corele",
          label: "Correo",
          align: "left",
          field: "no_corele",
          sortable: true
        }
      ],
      columns2: [
        {
          name: "desc",
          required: true,
          label: "Nro",
          align: "left",
          field: row => row.name,
          sortable: true
        },
        {
          name: "calories",
          align: "left",
          label: "Contacto",
          field: "calories",
          sortable: true
        },
        {
          name: "fat",
          label: "Cliente",
          field: "fat",
          align: "left",
          sortable: true
        },
        { name: "carbs", align: "left", label: "Correo", field: "carbs" }
      ],
      dataCliente: [],
      dataContactos: [],
      data: []
    };
  },
  methods: {
    ...mapActions("clientes", ["listar_clientes", "listar_personas_contacto"]),
    getSelectedString() {
      return this.selected.length === 0 ? "" : `${this.selected.length}`;
    }
  },
  async mounted() {
    this.dataCliente = await this.listar_clientes();
    this.dataContactos = await this.listar_personas_contacto();
  }
};
</script>

<style scoped></style>
