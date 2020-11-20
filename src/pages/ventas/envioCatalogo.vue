<template>
  <div>
    <q-card>
      <q-card-section class="bg-secondary text-white">
        <div class="text-center" style="font-size: 20px">
          Catalogos
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
    getSelectedString() {
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
