<template>
  <div class="q-pa-md">
    <div>
      <p class="bg-secondary dense shadow-5 text-center text-white">
        Citas Pendientes
      </p>
    </div>
    <div class="q-pb-md">
      <div class="row no-wrap shadow-1 bg-grey-4">
        <q-toolbar>
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
            class="full-width"
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
        </q-toolbar>
      </div>
    </div>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-table
        dense
        :pagination="pagination"
        v-show="showSimulatedReturnData"
        :data="info"
        :columns="columns"
        row-key="co_citcli"
        binary-state-sort
        :filter="filter"
        :loading="loading"
        loading-label="Cargando Data"
        class="my-sticky-header-table"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="co_citcli" :props="props">
              {{ props.row.co_citcli }}
            </q-td>
            <q-td key="no_sigcli" :props="props">
              {{ props.row.no_sigcli }}
            </q-td>
            <q-td key="no_percon" :props="props">
              {{ props.row.no_percon }}
            </q-td>
            <q-td key="no_sigare" :props="props">
              {{ props.row.no_sigare }}
            </q-td>
            <q-td key="no_direcc" :props="props">
              {{ props.row.no_direcc }}
            </q-td>
            <q-td key="fe_citcli" :props="props">
              {{ formatearFecha(props.row.fe_citcli) }}
            </q-td>
            <q-td key="ho_citcli" :props="props">
              {{ props.row.ho_citcli }}
            </q-td>
            <q-td key="no_estcit" :props="props">
              {{ props.row.no_estcit }}
            </q-td>
            <q-td key="co_percon" :props="props">
              <div class="q-gutter-xs">
                <!--                {{ props.row.no_estreq }}-->
                <q-btn
                  dense
                  @click="done(props.row)"
                  size="sm"
                  color="green"
                  icon="done"
                />
                <q-btn
                  dense
                  @click="done_all(props.row)"
                  size="sm"
                  color="info"
                  icon="done_all"
                />
                <q-btn
                  size="sm"
                  @click="checkbox(props.row)"
                  dense
                  color="red"
                  icon="cancel"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
        <q-inner-loading :showing="visible">
          <q-spinner-gears size="550px" color="red" />
        </q-inner-loading>
      </q-table>
    </transition>
    <q-dialog v-model="alert">
      <Edit @evtFechaCadAtrativos="alert = false" :info="informacion" />
    </q-dialog>
    <q-dialog v-model="check">
      <checkBox @click="boton" :dataCheck="itemsListos" />
    </q-dialog>
    <!-- {{ itemsListos }} -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { date } from "quasar";
export default {
  computed: {
    ...mapGetters("example", ["getRegistros"])
  },
  data() {
    return {
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      clienteR: "",
      contactoR: "",
      codigoCita: "",
      info: [],
      selection: ["teal", "red"],
      itemsListos: [],
      check: false,
      alert: false,
      selected: [],
      visible: true,
      showSimulatedReturnData: true,
      loading: false,
      filter: "",
      rowCount: 10,
      columns: [
        {
          name: "co_citcli",
          required: true,
          label: "Nro.",
          align: "left",
          field: "co_citcli",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "no_sigcli",
          align: "left",
          label: "Sigla Cliente",
          field: "no_sigcli",
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
          name: "no_direcc",
          align: "left",
          label: "Direccion",
          field: "no_direcc",
          sortable: true
        },
        {
          name: "fe_citcli",
          align: "center",
          label: "Fecha",
          field: "fe_citcli",
          format: val => date.formatDate(val, "DD-MM-YYYY"),
          sortable: true
        },
        {
          name: "ho_citcli",
          align: "left",
          label: "Hora",
          field: "ho_citcli",
          sortable: true
        },
        {
          name: "no_estcit",
          align: "left",
          label: "Estado",
          field: "no_estcit",
          sortable: true
        },
        {
          name: "co_percon",
          align: "center",
          label: "Acciones",
          field: "co_percon",
          sortable: true
        }
      ],
      informacion: []
    };
  },
  components: {
    checkBox: () => import("./checkBox")
  },
  methods: {
    ...mapActions("clientes", [
      "listar_rechazo_citas",
      "listar_citas_todas",
      "listar_citas_historico"
    ]),
    ...mapActions("example", [
      "mantenimiento_citas_cliente",
      "correo_consulta"
    ]),
    async boton(val) {
      console.log("boton", val);
      const data = {
        tipo: "E",
        cliente: this.clienteR,
        contacto: this.contactoR,
        codigoCita: this.codigoCita,
        codigosAnulacion: val
      };
      console.log("data-update", data);
      console.log("val-update", val);
      try {
        const response = await this.mantenimiento_citas_cliente(data);
        console.log("response", response);
      } catch (e) {
        console.log("error", e);
      }
      this.check = false;
    },
    async done(val) {
      this.$q
        .dialog({
          title: "Confirmar",
          message: "Seguro quieres continuar?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          // console.log('>>>> OK')
          console.log("boton", val);
          const data = {
            tipo: "C",
            cliente: val.co_client,
            contacto: val.co_percon,
            codigoCita: val.co_citcli
          };
          console.log("data-update", data);
          console.log("val-update", val);
          try {
            const response = await this.mantenimiento_citas_cliente(data);
            console.log("response", response);
            this.info = await this.listar_citas_todas();
            // this.info = await this.listar_citas_historico();
            this.$emit("actualizar");
          } catch (e) {
            console.log("error", e);
          }
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    async done_all(val) {
      this.$q
        .dialog({
          title: "Confirmar",
          message: "Seguro quieres continuar?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          console.log("boton", val);
          const data = {
            tipo: "F",
            cliente: val.co_client,
            contacto: val.co_percon,
            codigoCita: val.co_citcli
          };
          console.log("data-update", data);
          console.log("val-update", val);
          try {
            const response = await this.mantenimiento_citas_cliente(data);
            console.log("response", response);
            this.correo_consulta({
              co_person: val.co_percon,
              id: 3
            });
            this.info = await this.listar_citas_todas();
            // this.info = await this.listar_citas_historico();
            this.$emit("actualizar");
          } catch (e) {
            console.log("error", e);
          }
          // console.log('>>>> OK')
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    async checkbox(val) {
      console.log("checkbox", val);
      this.clienteR = val.co_client;
      this.contactoR = val.co_percon;
      this.codigoCita = val.co_citcli;
      this.listar_rechazo_citas()
        .then(resp => {
          console.log(resp);
          this.itemsListos = resp;
          this.check = true;
        })
        .catch(err => {
          console.log(err);
        });
      this.info = await this.listar_citas_todas();
      // this.info = await this.listar_citas_historico();
      this.$emit("actualizar");
    },
    coloreando(arg) {
      console.log(arg);
      return `background-color: ${arg}`;
    },
    ...mapActions("example", [
      "registros",
      "eliminar_requerimiento_cotizacion"
    ]),

    formatearFecha(fecha) {
      return date.formatDate(fecha, "YYYY-MM-DD");
    },
    getSelectedString() {
      return this.selected.length === 0 ? "" : `${this.selected.length}`;
    },
    cancelarCita(arg) {
      console.log(arg.co_citcli);
      this.$q
        .dialog({
          title: "Confirmar",
          message: "Esta seguro que quiere eliminar?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          console.log(">>>> OK");
        })
        .onOk(() => {
          console.log(">>>> second OK catcher");
        })
        .onCancel(() => {
          console.log(">>>> Cancel");
        })
        .onDismiss(() => {
          console.log("I am triggered on both OK and Cancel");
        });
    },
    actualizarCotizacion(arg) {
      console.log(arg);
      this.informacion = arg;
      console.log("Se preciono el boton");
      this.alert = true;
      // this.$router.push("/cotizacion/create");
      // this.$q.notify({
      //   color: "red",
      //   textColor: "white",
      //   message: "Por definir.!"
      // });
      console.log("Boron precinado");
    }
  },
  async mounted() {
    // this.$q.loading.show();
    this.loading = true;
    this.info = await this.listar_citas_todas();
    // await this.registros();
    this.loading = false;
    // this.$q.loading.hide();
  }
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
