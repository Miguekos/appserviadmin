<template>
  <div class="q-pa-md">
    <!--    {{ `ID proveedor ${id_pro}` }}-->
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
        <q-btn outline color="positive" @click="crearDireccion()">
          Agregar Contacto
        </q-btn>
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
                  ref="form.p_no_nombre"
                  dense
                  outlined
                  required="true"
                  label="Nombre"
                  v-model="form.p_no_nombre"
                  autofocus
                  @keyup.enter="prompt = false"
                  :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div>
                <q-input
                  ref="telefono"
                  dense
                  outlined
                  required
                  label="Telefono"
                  v-model="form.p_nu_telefo"
                  @keyup.enter="prompt = false"
                  :rules="[val => val.length == 9 || 'Debe tener 9 digitos']"
                />
              </div>
              <div>
                <q-input
                  ref="correo"
                  dense
                  outlined
                  required
                  label="Correo"
                  type="email"
                  v-model="form.p_no_correo"
                  @keyup.enter="prompt = false"
                  :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
              <div>
                <q-select
                  :options="generos"
                  ref="genero"
                  dense
                  outlined
                  required
                  label="Genero"
                  v-model="form.p_co_gencon"
                  @keyup.enter="prompt = false"
                  :rules="[val => !!val || 'El campo es obligatorio']"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" @click="reset()" type="reset" />
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
      generos: ["M", "F"],
      loading: false,
      form: {
        p_id_provee: null,
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
    reset() {
      // this.$refs.p_no_nombre.resetValidation();
      // this.$refs.telefono.resetValidation();
      // this.$refs.correo.resetValidation();
      // this.$refs.genero.resetValidation();
    },
    async onSubmit() {
      this.loading = true;
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "fas fa-check-circle",
        message: "Submitted"
      });
      this.registrarProveContacto(this.form).then(() => {
        this.contactoProveedor(this.form.p_id_provee).then(() => {
          this.prompt = false;
          this.loading = false;
        });
      });
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
    ...mapActions("proveedor", ["registrarProveContacto", "contactoProveedor"])
  },
  async mounted() {
    this.loading = true;
    this.form.p_id_provee = this.id_pro;
    this.loading = false;
    // await this.getClientes();
    // this.info = this.Clientes;
  }
};
</script>
