<template>
  <div>
    <!-- <q-dialog v-model="prompt" persistent> -->
    <q-card style="width: 100%">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-card-section>
          <div class="text-h6">Actualizar Direccion</div>
        </q-card-section>
        <!-- {{ dataUpdate }} -->
        <q-card-section>
          <div class="q-gutter-sm">
            <div>
              <q-input
                dense
                outlined
                required
                label="Direccion"
                v-model="form.direccion"
                @keyup.enter="prompt = false"
              />
            </div>
            <div>
              <q-select
                outlined
                dense
                required
                @input="provincia()"
                v-model="fieldDepartamento"
                :options="getDepartamento"
                option-value="no_ubigeo"
                option-label="nu_depart"
                emit-value
                map-options
                label="Departamento"
              />
            </div>
            <div>
              <q-select
                @input="distrito()"
                outlined
                dense
                required
                v-model="fieldProvincia"
                :options="getProvincia"
                option-value="no_ubigeo"
                option-label="no_provin"
                emit-value
                map-options
                label="Provincia"
              />
            </div>
            <div>
              <q-select
                outlined
                dense
                required
                v-model="form.codigoUbigeo"
                :options="getDistrito"
                option-value="no_ubigeo"
                option-label="no_provin"
                emit-value
                map-options
                label="Distrito"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="center" class="text-primary">
          <q-btn
            size="sm"
            color="positive"
            label="Agregar Direccion"
            type="submit"
          />
          <q-btn size="sm" color="negative" label="Cancel" @click="cerrar" />
        </q-card-actions>
      </q-form>
    </q-card>
    <!--    {{ form }}-->
    <!-- </q-dialog> -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["datafld", "id_pro", "dataUpdate"],
  computed: {
    ...mapGetters("proveedor", [
      "getDepartamento",
      "getProvincia",
      "getDistrito"
    ])
  },
  data() {
    return {
      updateCliente: false,
      selected: [],
      fieldDepartamento: "",
      fieldProvincia: "",
      fieldDistrito: "",
      model: "",
      form: {
        p_id: null,
        direccion: "",
        codigoUbigeo: "",
        codigoDireccion: ""
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
          name: "no_depart",
          align: "left",
          label: "Departamento",
          field: "no_depart",
          sortable: true
        },
        {
          name: "no_provin",
          align: "left",
          label: "Provincia",
          field: "no_provin",
          sortable: true
        },
        {
          name: "no_distri",
          align: "left",
          label: "Distrito",
          field: "no_distri",
          sortable: true
        },
        {
          name: "no_direcc",
          align: "left",
          label: "Direccion",
          field: "no_direcc",
          sortable: true
        },
        {
          name: "action",
          align: "right",
          label: "Acciones",
          field: "action",
          sortable: true
        }
      ]
    };
  },
  components: {
    // DialogUpdate: () => import("./Update")
    // TituloTabla: () => import("../../components/TituloTablas")
  },
  methods: {
    cerrar() {
      this.$emit("click");
    },
    rowClick(val) {
      console.log(val);
    },
    async boton() {
      await this.getClientes();
      this.updateCliente = false;
    },
    eliminarDireccionF() {
      console.log(`Se selecionaron ${this.selected.length} registros`);
      if (this.selected.length === 0) {
        this.$q.notify({
          color: "red",
          textColor: "white",
          icon: "fas fa-times",
          message: "Debe selecionar un registro para Eliminar.!"
        });
      }
      for (let index = 0; index < this.selected.length; index++) {
        const element = this.selected[index];
        console.log(element);
        //tipo de persona
        console.log(this.id_pro);
        // Codigo de cliente
        console.log(element.co_direcc);
        this.eliminarDireccion({
          p_id: this.id_pro,
          codigoDireccion: element.co_direcc,
          desactivarCliente: "S"
        })
          .then(resp => {
            console.log(resp);
            this.$q.notify({
              color: "green",
              textColor: "white",
              icon: "fas fa-check-circle",
              message: "Eliminado Correctamente.!"
            });
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            this.direccionCliente(this.id_pro);
            // this.info = this.Clientes;
          });
      }
    },
    ...mapActions("proveedor", [
      "registrarProveDireccion",
      "direccionProveedor",
      "pblistar_departamento",
      "pblistar_provincia",
      "pblistar_distrito"
    ]),
    ...mapActions("clientes", [
      "actualizarDireccion",
      "direccionCliente",
      "eliminarDireccion",
      "contactoCliente"
    ]),
    async onSubmit() {
      this.loading = true;
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "fas fa-check-circle",
        message: "Submitted"
      });
      // console.log(`Id para guardar: ${this.id_pro}`);
      // this.form.p_id = this.id_pro;
      this.actualizarDireccion(this.form).then(result => {
        console.log(result);
        this.direccionCliente(this.form.p_id).then(() => {
          this.loading = false;
          this.prompt = false;
          this.form.direccion = "";
          this.form.codigoUbigeo = "";
          this.form.codigoDireccion = "";
          this.$emit("click");
        });
      });
      // this.reload();
      // this.$route.push(`/proveedores/detalle/${this.$route.params.id}`)
    },
    reload: function() {
      this.$router.go(this.$router.currentRoute);
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
    provincia() {
      console.log(this.fieldDepartamento);
      this.pblistar_provincia(this.fieldDepartamento);
      this.fieldProvincia = "";
    },
    distrito() {
      console.log(this.fieldProvincia);
      this.pblistar_distrito(this.fieldProvincia);
      this.form.codigoUbigeo = "";
      // this.form.codigoDireccion = "";
    },
    getSelectedString() {
      return this.selected.length === 0 ? "" : `${this.selected.length}`;
    }
  },
  async mounted() {
    this.form.direccion = this.dataUpdate.no_direcc;
    this.fieldDepartamento = this.dataUpdate.no_depart;
    this.fieldProvincia = this.dataUpdate.no_provin;
    this.form.codigoUbigeo = this.dataUpdate.co_ubigeo;
    this.form.p_id = this.dataUpdate.co_client;
    this.form.codigoDireccion = this.dataUpdate.co_direcc;
    // this.loading = true;
    // this.form.p_id = this.id_pro;
    // this.pblistar_departamento();
    // this.loading = false;
    // await this.getClientes();
    // this.info = this.Clientes;
  },
  watch: {}
};
</script>
