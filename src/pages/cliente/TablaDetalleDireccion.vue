<template>
  <div class="q-pt-sm q-pr-md q-pl-md">
    <div class="q-pb-md">
      <div>
        <p class="bg-secondary dense shadow-5 text-center text-white">
          Direcciones
        </p>
      </div>
      <div class="row no-wrap shadow-1 bg-grey-4">
        <q-toolbar class="q-gutter-sm">
          <q-input
            v-if="$q.screen.gt.xs"
            borderless
            placeholder="Buscar"
            dense
            color="primary"
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-input
            v-else
            borderless
            placeholder="Buscar"
            dense
            color="primary"
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-space />

          <!-- <q-btn
            v-if="$q.screen.gt.xs"
            no-wrap
            size="md"
            color="red"
            no-caps
            outline
            label="Eliminar"
            @click="eliminarDireccionF()"
          ></q-btn> -->
          <q-btn
            v-if="$q.screen.gt.xs"
            no-wrap
            size="md"
            no-caps
            outline
            color="positive"
            label="Agregar"
            @click="crearDireccion()"
          ></q-btn>
        </q-toolbar>
      </div>
    </div>
    <q-table
      dense
      :pagination="pagination"
      :data="datafld"
      :columns="columns"
      row-key="co_direcc"
      :filter="filter"
      :loading="loading"
      :selected.sync="selected"
      :selected-rows-label="getSelectedString"
      class="my-sticky-header-table"
    >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <!-- <q-btn
              dense
              size="sm"
              @click="rowClick(props.row)"
              color="info"
              icon="visibility"
            /> -->
            <q-btn
              dense
              size="sm"
              @click="rowClick(props.row)"
              color="warning"
              icon="edit"
            />
          </div>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="prompt" persistent>
      <q-card style="width: 100%">
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
            <q-btn size="sm" color="negative" label="Cancel" type="reset" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <!--    {{ $data.selected }}-->
    <div>
      <q-dialog
        v-model="updateCliente"
        persistent
        transition-show="flip-down"
        transition-hide="flip-up"
      >
        <q-card style="width: 700px">
          <DialogUpdate @click="boton" :dataUpdate="dataUpdate" />
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["datafld", "id_pro"],
  computed: {
    ...mapGetters("proveedor", [
      "getDepartamento",
      "getProvincia",
      "getDistrito"
    ])
  },
  data() {
    return {
      dataUpdate: [],
      updateCliente: false,
      selected: [],
      fieldDepartamento: "",
      fieldProvincia: "",
      fieldDistrito: "",
      model: "",
      form: {
        p_id: null,
        direccion: "",
        codigoUbigeo: ""
      },
      prompt: false,
      pagination: {
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: 10
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
    DialogUpdate: () => import("./updateDireccion")
    // TituloTabla: () => import("../../components/TituloTablas")
  },
  methods: {
    rowClick(val) {
      console.log(val);
      this.dataUpdate = val;
      this.updateCliente = true;
    },
    async boton() {
      // await this.getClientes();
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
      "guardarDireccion",
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
      console.log(`Id para guardar: ${this.id_pro}`);
      this.form.p_id = this.id_pro;
      this.guardarDireccion(this.form).then(result => {
        console.log(result);
        this.direccionCliente(this.id_pro).then(() => {
          this.loading = false;
          this.prompt = false;
          this.form.direccion = "";
          this.form.codigoUbigeo = "";
          this.form.codigoDireccion = "";
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
      this.form.codigoDireccion = "";
    },
    getSelectedString() {
      return this.selected.length === 0 ? "" : `${this.selected.length}`;
    }
  },
  async mounted() {
    this.loading = true;
    this.form.p_id = this.id_pro;
    this.pblistar_departamento();
    this.loading = false;
    // await this.getClientes();
    // this.info = this.Clientes;
  },
  watch: {}
};
</script>

<style lang="sass">
.my-sticky-header-table
  /* max height is important */
  .q-table__middle
    max-height: 400px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #26a69a
    color: white

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 28px
</style>
