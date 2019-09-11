<template>
  <div class="q-pa-md">
    <!--    {{ datafld }}-->
    <q-table
      :data="datafld"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
      :pagination.sync="pagination"
    >
      <template v-slot:top>
        <img
          style="height: 50px; width: 50px"
          src="/statics/minilogoservi.png"
        />
        <q-space />
        <q-btn class="bg-positive text-white" @click="crearDireccion()">
          Agregar Direccion
        </q-btn>
        <!--        <q-input-->
        <!--          borderless-->
        <!--          dense-->
        <!--          debounce="300"-->
        <!--          color="primary"-->
        <!--          v-model="filter"-->
        <!--        >-->
        <!--          <template v-slot:append>-->
        <!--            <q-icon name="search" />-->
        <!--          </template>-->
        <!--        </q-input>-->
      </template>
    </q-table>
    <q-dialog full-width v-model="prompt" persistent>
      <q-card>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">Agregar Direccion</div>
          </q-card-section>

          <q-card-section>
            <div class="q-gutter-sm">
              <div>
                <q-input
                  dense
                  outlined
                  required
                  label="Direccion del Proveedor"
                  v-model="form.p_no_direcc"
                  @keyup.enter="prompt = false"
                />
              </div>
              <div>
                <q-input
                  dense
                  outlined
                  required
                  label="Codigo de Ubigeo"
                  v-model="form.p_co_ubigeo"
                  @keyup.enter="prompt = false"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" type="reset" />
            <q-btn flat label="Agregar Direccion" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
<!--    {{ $data.form }}-->
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["datafld", "id_pro"],
  computed: {
    // ...mapGetters("clientes", ["Clientes"])
  },
  data() {
    return {
      form: {
        p_id_provee: "",
        p_no_direcc: "",
        p_co_ubigeo: ""
      },
      prompt: false,
      pagination: {
        sortBy: "id",
        descending: false,
        page: 2,
        rowsPerPage: 3,
        rowsNumber: 3,
        pagesNumber: 3
      },
      info: [],
      loading: false,
      filter: "",
      columns: [
        {
          name: "id",
          required: true,
          label: "Nro.",
          align: "left",
          field: "id_provee",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "direccion",
          align: "left",
          label: "Direccion",
          field: "no_direcc",
          sortable: true
        },
        {
          name: "codigoubigeo",
          align: "left",
          label: "Codigo Ubigeo",
          field: "co_ubigeo",
          sortable: true
        },
        {
          name: "id_provee",
          align: "left",
          label: "id_provee",
          field: "id_provee",
          sortable: true
        }
      ]
    };
  },
  methods: {
    async onSubmit() {
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "fas fa-check-circle",
        message: "Submitted"
      });
      await this.registrarProveDireccion(this.form);
      this.prompt = false;
    },

    onReset() {
      this.prompt = false;
      this.name = null;
      this.age = null;
      this.accept = false;
    },
    crearDireccion() {
      this.prompt = true;
    },
    ...mapActions("proveedor", ["registrarProveDireccion"])
  },
  async mounted() {
      this.form.p_id_provee = this.id_pro;
    // await this.getClientes();
    // this.info = this.Clientes;
  }
};
</script>
