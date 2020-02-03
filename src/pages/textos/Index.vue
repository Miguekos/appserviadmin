<template>
  <div>
    <q-page padding>
      <q-card class="my-card">
        <q-item class="shadow-5 bg-secondary text-white">
          <q-item-section>
            <q-item-label style="font-size: 20px">
              MANTENIMIENTO DE TEXTOS
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <div class="text-right">
              <Atras />
            </div>
          </q-item-section>
        </q-item>

        <q-item class="full-width">
          <template>
            <div class="justify-around full-width">
              <div class="q-pa-sm">
                <q-input
                  dense
                  v-model="form.nombreTextoCorreo"
                  label="Nombre de texto"
                />
              </div>
              <div class="q-pa-sm">
                <template>
                  <div class="q-pa-md q-gutter-sm">
                    <q-editor v-model="form.textoCorreo" min-height="15rem" />

                    <!-- <q-card flat bordered>
                      <q-card-section>
                        <pre style="white-space: pre-line">{{ editor }}</pre>
                      </q-card-section>
                    </q-card> -->

                    <q-card flat bordered>
                      <q-card-section v-html="form.textoCorreo" />
                    </q-card>
                  </div>
                </template>
              </div>
              <div class="q-pa-sm text-center">
                <q-btn
                  v-if="idupdate != null"
                  @click="update()"
                  color="info"
                  label="Actualizar"
                />
                <q-btn
                  v-else
                  @click="guardarTextos()"
                  color="positive"
                  label="Grabar"
                />
              </div>
            </div>
          </template>
        </q-item>

        <q-item class="full-width">
          <template>
            <div class="full-width">
              <div>
                <p class="bg-secondary dense shadow-5 text-center text-white">
                  Catalogos de texto
                </p>
              </div>
              <div class="q-pb-md">
                <div class="row no-wrap shadow-1 bg-grey-4">
                  <q-toolbar>
                    <q-input
                      v-if="$q.screen.gt.xs"
                      borderless
                      class="full-width"
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
                  </q-toolbar>
                </div>
              </div>
              <q-table
                dense
                :data="info"
                :columns="columns"
                row-key="co_txtcor"
                :selected-rows-label="getSelectedString"
                selection="multiple"
                :selected.sync="selected"
                :filter="filter"
                :loading="loading"
                class="cursor-pointer"
                :pagination.sync="pagination"
              >
                <template v-slot:body-cell="props">
                  <q-td :props="props" @click.native="rowClick(props.row)">
                    <div>{{ props.value }}</div>
                  </q-td>
                </template>
              </q-table>
              <!-- <div class="q-mt-md">
                Selected: {{ JSON.stringify(selected) }}
              </div> -->
              <q-separator />
              <q-toolbar class="text-center">
                <q-toolbar-title class="q-pa-md row justify-around">
                  <!-- <q-toolbar-title class="q-pa-md q-gutter-md"> -->
                  <q-btn
                    size="sm"
                    color="negative"
                    text-color="white"
                    label="Eliminar"
                    @click="eliminarRow()"
                  />
                </q-toolbar-title>
              </q-toolbar>
              <!-- {{ $data.selected }} -->
            </div>
          </template>
        </q-item>
      </q-card>
    </q-page>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("clientes", ["getnombreTextoCorreo", "gettextoCorreo"]),
    ...mapGetters("clientes", ["Clientes"]),
    ...mapGetters("example", ["get_listar_catalogos_new"])
  },
  data() {
    return {
      idupdate: null,
      pagination: {
        sortBy: "nu_ordcat",
        dataLista: [],
        descending: false,
        page: 1,
        rowsPerPage: 7
        // rowsNumber: xx if getting data from a server
      },
      selected: [],
      info: [],
      loading: false,
      filter: "",
      columns: [
        {
          name: "co_txtcor",
          required: true,
          label: "Nro",
          align: "left",
          field: "co_txtcor",
          sortable: true,
          style: "width: 175px"
        },
        {
          name: "no_txtcor",
          align: "left",
          label: "Nombre de Texto",
          field: "no_txtcor",
          sortable: true
        },
        {
          name: "de_txtcor",
          label: "Texto",
          align: "left",
          field: "de_txtcor",
          style: "width: 10px",
          sortable: true
        }
      ],
      textoCorreo: "",
      file: [],
      form: {
        nombreTextoCorreo: "",
        textoCorreo: ""
      },
      uploadPercentage: 0,
      selected_file: "",
      check_if_document_upload: false,
      model: null,
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    };
  },
  components: {
    // Catalogo: () => import("./Catalogo"),
    // ListarCatalogo: () => import("./ListarCatalogo"),
    Atras: () => import("../../components/IrAtras")
    // TablaFiltro: () => import("./TablaFiltro"),
    // CuadroResumen: () => import("./CuadroResumen")
  },
  methods: {
    ...mapActions("clientes", [
      "getClientes",
      "eliminarCliente",
      "listar_texto_correos",
      "mantenimiento_textos_correo_update"
    ]),
    ...mapActions("example", [
      "listar_catalogos_new",
      "mantenimiento_catalogos"
    ]),
    coloreando(arg) {
      return `background-color: ${arg}`;
    },
    onRowClick() {
      console.log("Se preciono una ROW");
    },
    eliminarRow() {
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
        // Codigo de cliente
        this.mantenimiento_catalogos(element.co_txtcor)
          .then(resp => {
            console.log(resp);
            this.$q.notify({
              position: "top-right",
              color: "green",
              textColor: "white",
              icon: "fas fa-check-circle",
              message: "Eliminado Correctamente.!"
            });
          })
          .catch(err => {
            console.log(err);
          })
          .finally(async () => {
            this.info = await this.listar_texto_correos();
            // this.info = this.Clientes;
          });
      }
    },
    URL(arg) {
      this.$router.push(arg);
    },
    rowClick(val) {
      console.log(val);
      this.form.nombreTextoCorreo = val.no_txtcor;
      this.form.textoCorreo = val.de_txtcor;
      this.idupdate = val.co_txtcor;
    },
    rowClickNew() {
      console.log();
      if (this.selected.length === 0) {
        this.$q.notify({
          color: "red",
          textColor: "white",
          icon: "fas fa-times",
          message: "Debe selecionar un registro para VER.!"
        });
      } else {
        console.log(this.selected[0].co_client);
        this.$router.push(`/cliente/detalle/${this.selected[0].co_client}`);
      }
    },
    getSelectedString() {
      return this.selected.length === 0 ? "" : `${this.selected.length}`;
    },
    // getSelectedString() {
    //     return this.selected.length === 0
    //         ? ""
    //         : `${this.selected.length} record${
    //             this.selected.length > 1 ? "s" : ""
    //         } selected of ${this.info.length}`;
    // }
    ...mapActions("example", ["guardarCatalogos", "listar_catalogos_new"]),
    ...mapActions("clientes", ["mantenimiento_textos_correo"]),
    async guardarTextos() {
      if (this.form.nombreTextoCorreo != "" && this.form.textoCorreo != "") {
        await this.mantenimiento_textos_correo(this.form);
        this.form.nombreTextoCorreo = "";
        this.form.textoCorreo = "";
        this.info = await this.listar_texto_correos();
      } else {
        console.log("Se debe cargar un archivo antes de guardar");
      }
    },
    async update() {
      if (this.form.nombreTextoCorreo != "" && this.form.textoCorreo != "") {
        await this.mantenimiento_textos_correo_update({
          ...this.form,
          id: this.idupdate
        });
        this.form.nombreTextoCorreo = "";
        this.form.textoCorreo = "";
        this.info = await this.listar_texto_correos();
      } else {
        console.log("Se debe cargar un archivo antes de guardar");
      }
    },
    atras() {
      console.log("Ir Atras");
      this.$router.go(-1);
    }
  },
  async mounted() {
    // await this.getClientes();
    this.info = await this.listar_texto_correos();
  }
  // name: 'PageName',
};
</script>

<style></style>
