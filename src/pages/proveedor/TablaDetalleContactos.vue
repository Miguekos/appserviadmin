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
          Agregar Contacto
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
            <div class="text-h6">Agregar Contacto</div>
          </q-card-section>

          <q-card-section>
            <div class="q-gutter-sm">
              <div>
                <q-input
                  dense
                  outlined
                  required="true"
                  label="Nombre"
                  v-model="form.p_no_nombre"
                  autofocus
                  @keyup.enter="prompt = false"
                />
              </div>
              <div>
                <q-input
                  dense
                  outlined
                  required
                  label="Telefono"
                  v-model="form.p_nu_telefo"
                  @keyup.enter="prompt = false"
                />
              </div>
              <div>
                <q-input
                  dense
                  outlined
                  required
                  label="Correo"
                  type="email"
                  v-model="form.p_no_correo"
                  @keyup.enter="prompt = false"
                />
              </div>
              <div>
                <q-input
                  dense
                  outlined
                  required
                  label="Genero"
                  v-model="form.p_co_gencon"
                  @keyup.enter="prompt = false"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" type="reset" />
            <q-btn flat label="Agregar Contacto" type="submit" />
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
        p_no_nombre: "",
        p_nu_telefo: "",
        p_no_correo: "",
        p_co_gencon: ""
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
          name: "nombre",
          align: "left",
          label: "Nombre",
          field: "no_nombre",
          sortable: true
        },
        {
          name: "telf",
          align: "left",
          label: "Telefono",
          field: "nu_telefo",
          sortable: true
        },
        {
          name: "correo",
          align: "left",
          label: "Correo",
          field: "no_correo",
          sortable: true
        },
        {
          name: "genero",
          align: "left",
          label: "Genero",
          field: "co_gencon",
          sortable: true
        },
        {
          name: "id_conpro",
          align: "left",
          label: "id_conpro",
          field: "id_conpro",
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
      await this.registrarProveContacto(this.form);
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
    ...mapActions("proveedor", ["registrarProveContacto"])
  },
  async mounted() {
       this.form.p_id_provee = this.id_pro;
    // await this.getClientes();
    // this.info = this.Clientes;
  }
};
</script>
