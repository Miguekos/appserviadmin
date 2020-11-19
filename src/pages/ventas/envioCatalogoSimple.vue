<template>
  <div>
    <q-card>
      <q-card-section class="bg-secondary text-white">
        <div class="text-center" style="font-size: 20px">
          ENVIAR CATALOGO
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          dense
          hide-header
          :data="data"
          :columns="columns"
          row-key="co_catpro"
          :selected-rows-label="getSelectedString"
          selection="multiple"
          :selected.sync="selected"
        >
        </q-table>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn color="negative" v-close-popup flat>Cerrar</q-btn>
        <q-btn color="positive" v-close-popup @click="enviarCorreos" flat
          >Enviar</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      selected: [],
      columns: [
        {
          name: "co_catpro",
          required: true,
          label: "Nro.",
          align: "left",
          field: "co_catpro",
          sortable: true
        },
        {
          name: "no_catpro",
          align: "left",
          label: "Catalogos",
          field: "no_catpro",
          sortable: true
        }
      ],
      data: []
    };
  },
  methods: {
    ...mapActions("clientes", ["listar_catalogos"]),
    ...mapActions("example", ["enviarEmailMasicoAmber", "correo_consulta"]),
    async enviarCorreos() {
      this.loadboton = true;
      let adjuntos = [];
      let clientes = [];
      clientes.push(this.$store.state.clientes.setClientesEnviar);
      const array = this.$store.state.clientes.setCatalogosEnviar;
      // for (let index = 0; index < array2.length; index++) {
      //   const element = array2[index];
      //   console.log(element.co_percon);
      //   clientes.push(`${element.co_percon}`);
      // }
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        console.log(element.co_arcadj);
        adjuntos.push(
          `http://95.111.235.214:4100/api/containers/container1/download/${
            element.co_arcadj
          }`
        );
      }
      await this.enviarEmailMasicoAmber({
        cliente: clientes,
        adjuntos: adjuntos
      });
      this.loadboton = false;
      this.correo_consulta({
        co_person: this.$store.state.clientes.setClientesEnviar,
        id: 2
      });
      this.$emit("click");
    },
    getSelectedString() {
      console.log(this.selected);
      this.$store.commit("clientes/setCatalogosEnviar", this.selected);
      return this.selected.length === 0 ? "" : `${this.selected.length}`;
    }
  },
  async mounted() {
    this.data = await this.listar_catalogos();
  }
};
</script>

<style scoped></style>
