<template>
  <div>
    <q-card>
      <q-card-section class="bg-secondary text-white">
        <div class="text-center" style="font-size: 20px">
          Destinatararios
        </div>
      </q-card-section>
      <q-card-section class="q-pa-md">
        <q-select
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          @filter="filterFn"
          v-model="clienteBuscar"
          :options="dataCliente"
          option-label="no_client"
          option-value="co_client"
          emit-value
          map-options
          label="Cliente"
          dense
          options-dense
          @input="input2"
          auto-select
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
        <q-btn
          size="sm"
          color="info"
          icon="add"
          @click="anadir()"
          label="Añadir"
        >
        </q-btn>
        <q-btn size="sm" color="positive" icon="email" label="Enviar"> </q-btn>
      </q-card-actions>

      <q-separator />

      <q-card-section>
        <q-table
          dense
          title=""
          :data="dataSelecion"
          :columns="columns2"
          row-key="name"
          binary-state-sort
        >
        </q-table>
      </q-card-section>
    </q-card>
    <!-- {{ dataSelecion }} -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      lotrOpts: [],
      model: null,
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
          name: "no_sigare",
          align: "left",
          label: "Area",
          field: "no_sigare",
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
          name: "no_sigare",
          align: "left",
          label: "Area",
          field: "no_sigare",
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
      dataCliente: [],
      dataContactos: [],
      dataSelecion: []
    };
  },
  methods: {
    ...mapActions("clientes", ["listar_clientes", "listar_personas_contacto"]),
    anadir() {
      console.log(this.selected);
      for (let index = 0; index < this.selected.length; index++) {
        const element = this.selected[index];
        console.log(element);
        this.dataSelecion.push(element);
      }
    },
    async input2(val) {
      console.log(val);
      this.dataContactos = await this.listar_personas_contacto({
        id: val
      });
    },
    filterFn(val, update, abort) {
      const asd = this.lotrOpts;
      console.log(val);
      console.log(asd);
      if (val.length < 1) {
        abort();
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.dataCliente = asd.filter(v =>
          v.no_client.toLowerCase().includes(needle)
        );
      });
    },
    getSelectedString() {
      return this.selected.length === 0 ? "" : `${this.selected.length}`;
    }
  },
  async mounted() {
    this.dataCliente = await this.listar_clientes({
      id: null
    });
    this.lotrOpts = await this.listar_clientes({
      id: null
    });
  }
};
</script>

<style scoped></style>
