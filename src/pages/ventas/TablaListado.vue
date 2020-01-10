<template>
  <div class="q-pa-md">
    <div>
      <p class="bg-secondary shadow-5 text-center text-white">
        Clientes
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

          <q-space />

          <!--          <q-btn-->
          <!--            flat-->
          <!--            dense-->
          <!--            no-wrap-->
          <!--            color="positive"-->
          <!--            icon="add"-->
          <!--            no-caps-->
          <!--            label="Nuevo"-->
          <!--            class="q-ml-sm q-px-md"-->
          <!--          />-->
          <!--          <q-btn-->
          <!--            flat-->
          <!--            dense-->
          <!--            no-wrap-->
          <!--            color="negative"-->
          <!--            icon="remove"-->
          <!--            no-caps-->
          <!--            label="Eliminar"-->
          <!--            class="q-ml-sm q-px-md"-->
          <!--          />-->
          <q-btn
            flat
            dense
            no-wrap
            color="primary"
            icon="cloud_upload"
            no-caps
            label="Exportar"
            class="q-ml-sm q-px-md"
          />
        </q-toolbar>
      </div>
    </div>
    <q-table
      dense
      :separator="separator"
      :filter="filter"
      :data="getseguimiento_cliente"
      :columns="columns"
      row-key="no_sigcli"
      :pagination.sync="pagination"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="no_sigcli" :props="props">
            {{ props.row.no_sigcli }}
          </q-td>
          <q-td key="no_percon" :props="props">
            {{ props.row.no_percon }}
          </q-td>
          <q-td key="co_estemo" :props="props">
            <!--            <q-btn round size="xs" :color="emoticones(props.row.co_semsve)" />-->
            <q-icon
              class="cursor-pointer"
              @click="updateEmoti(props.row)"
              :id="emotiColor(props.row.co_estemo)"
              :name="emotions(props.row.co_estemo)"
              size="25px"
            ></q-icon>
          </q-td>
          <q-td key="co_semsve" :props="props">
            <q-btn round size="xs" :color="semaforo(props.row.co_semsve)" />
          </q-td>
          <q-td key="no_sigare" :props="props">
            <q-badge :style="coloreando(props.row.no_colare)">
              {{ props.row.no_sigare }}
            </q-badge>
          </q-td>
          <q-td key="no_ubicac" :props="props">
            {{ props.row.no_ubicac }}
          </q-td>
          <q-td key="no_sigsec" :props="props">
            <q-badge :style="coloreando(props.row.no_colsec)">
              {{ props.row.no_sigsec }}
            </q-badge>
          </q-td>
          <q-td key="no_usuari" :props="props">
            {{ props.row.no_usuari }}
          </q-td>
          <q-td key="fe_regist" :props="props">
            {{ props.row.fe_regist }}
          </q-td>
          <q-td key="no_sigsve" :props="props">
            <q-badge :style="coloreando(props.row.no_colsve)">
              {{ props.row.no_sigsve }}
            </q-badge>
          </q-td>
          <q-td key="no_coment" :props="props">
            {{ props.row.no_coment }}
          </q-td>
          <q-td key="ca_consul" :props="props">
            {{ props.row.ca_consul }}
          </q-td>
          <q-td key="ca_catalo" :props="props">
            {{ props.row.ca_catalo }}
          </q-td>
          <q-td key="co_percon" :props="props">
            <div class="q-gutter-xs">
              <q-btn
                dense
                @click="prueba(props.row.co_percon)"
                size="sm"
                color="info"
                icon="remove_red_eye"
              />
              <q-btn
                dense
                @click="
                  dialogLlamadaCliente({
                    estado: true,
                    cliente: props.row.co_client,
                    contacto: props.row.co_percon
                  })
                "
                size="sm"
                color="primary"
                icon="local_phone"
              />
              <q-btn
                dense
                size="sm"
                @click="dialogCorreoOpen()"
                color="positive"
                icon="email"
              />
              <q-btn
                size="sm"
                dense
                color="amber"
                text-color="black"
                icon="email"
              />
              <q-btn
                dense
                @click="
                  dialogRegistrarCitaCliente({
                    estado: true,
                    cliente: props.row.co_client,
                    contacto: props.row.co_percon
                  })
                "
                size="sm"
                color="red-6"
                icon="edit"
              />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog full-width v-model="dialogLlamadaEstado">
      <Llamadas
        :cliente="dialogLlamada.cliente"
        :contacto="dialogLlamada.contacto"
      />
    </q-dialog>
    <q-dialog full-width v-model="dialogRegistrarCitaEstado">
      <RegistrarCita
        :cliente="dialogRegistrarCita.cliente"
        :contacto="dialogRegistrarCita.contacto"
      />
    </q-dialog>
    <q-dialog v-model="card">
      <DialogInformativo :co_person="co_persona" />
    </q-dialog>

    <q-dialog v-model="emoti">
      <Emoticons :infoEmoti="infoEmoti" />
    </q-dialog>

    <q-dialog v-model="dialogCorreo">
      <q-card>
        <q-card-section>
          <div class="q-pa-md">
            <div class="row q-gutter-sm">
              <q-checkbox
                v-for="(item, index) in correosVarios"
                :key="index"
                dense
                v-model="orange[item]"
                :label="item.no_catpro"
                color="orange"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="around">
          <q-btn v-close-popup flat>Enviar</q-btn>
          <q-btn v-close-popup flat>Cerrar</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--    {{ orange }}-->
    <!--    {{ dialogRegistrarCita }}-->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
const columns = [
  {
    name: "no_sigcli",
    align: "left",
    sortable: true,
    label: "Cliente",
    field: "no_sigcli",
    style: "width: 15%"
  },
  {
    name: "no_percon",
    align: "left",
    sortable: true,
    label: "Contacto",
    field: "no_percon"
  },
  {
    name: "co_estemo",
    align: "left",
    sortable: true,
    label: "",
    field: "co_estemo"
  },
  {
    name: "co_semsve",
    align: "left",
    sortable: true,
    label: "Sem.",
    field: "co_semsve"
  },
  {
    name: "no_sigare",
    align: "left",
    sortable: true,
    label: "Area",
    field: "no_sigare"
  },
  {
    name: "no_ubicac",
    align: "left",
    sortable: true,
    label: "Ubicacion",
    field: "no_ubicac"
  },
  {
    name: "no_sigsec",
    align: "left",
    sortable: true,
    label: "Sector",
    field: "no_sigsec"
  },
  {
    name: "no_usuari",
    align: "left",
    sortable: true,
    label: "Usuario",
    field: "no_usuari",
    style: "width: 15%"
  },
  {
    name: "fe_regist",
    align: "left",
    sortable: true,
    label: "Fecha",
    field: "fe_regist",
    style: "width: 15%"
  },
  {
    name: "no_sigsve",
    align: "left",
    sortable: true,
    label: "Estados",
    field: "no_sigsve",
    style: "width: 15%"
  },
  {
    name: "no_coment",
    align: "left",
    sortable: true,
    label: "Comentario",
    field: "no_coment"
  },
  {
    name: "ca_consul",
    align: "center",
    sortable: true,
    label: "Consultas",
    field: "ca_consul"
  },
  {
    name: "ca_catalo",
    align: "left",
    sortable: true,
    label: "Catálogo",
    field: "ca_catalo"
  },
  {
    name: "co_percon",
    align: "center",
    sortable: true,
    label: "Accions",
    field: "co_percon",
    style: "width: 5%"
  }
];

export default {
  computed: {
    ...mapGetters("example", [
      "dialogLlamada",
      "dialogRegistrarCita",
      "getseguimiento_cliente",
      "getlistar_estado_seguimiento",
      "dialogLlamadaEstado",
      "dialogRegistrarCitaEstado"
    ]),
    ...mapGetters("clientes", ["Clientes"])
  },
  data() {
    return {
      correosVarios: [],
      teal: true,
      orange: [],
      red: true,
      cyan: false,
      dialogCorreo: false,
      infoEmoti: [],
      emoti: false,
      co_persona: null,
      carousel: false,
      card: false,
      sliders: false,

      slide: 1,
      lorem: "Lorem",
      stars: 3,

      slideVol: 39,
      slideAlarm: 56,
      slideVibration: 63,
      pagination: {
        sortBy: "no_sigcli",
        descending: false,
        page: 1,
        rowsPerPage: 15
        // rowsNumber: xx if getting data from a server
      },
      separator: "horizontal",
      // separator: "cell",
      filter: "",
      search: "",
      columns,
      alert: false
    };
  },
  methods: {
    dialogCorreoOpen() {
      this.dialogCorreo = true;
    },
    checkbox() {
      this.$q
        .dialog({
          title: "Options",
          message: "Choose your options",
          options: {
            type: "checkbox",
            model: [],
            // inline: true
            items: [
              { label: "Option 1", value: "opt1", color: "secondary" },
              { label: "Option 2", value: "opt2" },
              { label: "Option 3", value: "opt3" }
            ]
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          console.log(">>>> OK, received", data);
        })
        .onCancel(() => {
          console.log(">>>> Cancel");
        })
        .onDismiss(() => {
          console.log("I am triggered on both OK and Cancel");
        });
    },
    coloreando(arg) {
      return `background-color: ${arg}`;
    },
    updateEmoti(arg) {
      this.infoEmoti = arg;
      this.emoti = true;
      // this.$q.notify({
      //   message: arg,
      //   color: "blue",
      //   textColor: "white"
      // });
    },
    prueba(arg) {
      this.co_persona = arg;
      this.card = true;
      // this.$q.notify({
      //   message: arg,
      //   color: "blue",
      //   textColor: "white"
      // });
    },
    emotions(arg) {
      let respuesta = "";
      if (arg == 1) {
        respuesta = "far fa-laugh-beam";
      } else if (arg == 2) {
        respuesta = "far fa-smile-beam";
      } else if (arg == 3) {
        respuesta = "far fa-meh";
      } else if (arg == 4) {
        respuesta = "far fa-frown";
      } else if (arg == 5) {
        respuesta = "far fa-angry";
      } else if (arg == 6) {
        respuesta = "far fa-kiss-wink-heart";
      } else if (arg == 7) {
        respuesta = "far fa-hand-holding-usd";
      } else if (arg == 8) {
        respuesta = "far fa-meh-blank";
      }
      return respuesta;
    },
    emotiColor(arg) {
      let color = "";
      if (arg == 1) {
        color = "color1";
      } else if (arg == 2) {
        color = "color2";
      } else if (arg == 3) {
        color = "color3";
      } else if (arg == 4) {
        color = "color4";
      } else if (arg == 5) {
        color = "color5";
      } else if (arg == 6) {
        color = "color6";
      } else if (arg == 7) {
        color = "color7";
      } else if (arg == 8) {
        color = "color8";
      }
      return color;
    },
    semaforo(arg) {
      let respuesta = "";
      if (arg == 0) {
        respuesta = "black";
      } else if (arg == 1) {
        respuesta = "blue";
      } else if (arg == 2) {
        respuesta = "green";
      } else if (arg == 3) {
        respuesta = "yellow";
      } else if (arg == 4) {
        respuesta = "amber";
      } else if (arg == 5) {
        respuesta = "red";
      }
      return respuesta;
    },
    test(arg) {
      console.log(arg);
    },
    ...mapActions("clientes", ["getClientes"]),
    ...mapActions("example", [
      "dialogLlamadaCliente",
      "dialogRegistrarCitaCliente",
      "seguimiento_cliente",
      "listar_estado_seguimiento",
      "listar_catalogos"
    ]),
    update(val) {
      console.log(val);
    }
  },
  components: {
    Llamadas: () => import("./Llamadas"),
    RegistrarCita: () => import("./RegistrarCita"),
    DialogInformativo: () => import("./DialogInformativo"),
    Emoticons: () => import("./Emoticons")
    // CuadroResumen: () => import("./CuadroResumen")
    // AddRegistro: () => import("./Create")
  },
  async mounted() {
    // await this.getClientes();
    await this.seguimiento_cliente({
      cliente: null,
      seguimiento: null,
      economico: null,
      semoforo: null
    });
    await this.listar_estado_seguimiento();
    await this.listar_catalogos()
      .then(resp => {
        this.correosVarios = resp;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
