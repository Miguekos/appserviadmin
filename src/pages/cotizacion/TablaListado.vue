<template>
  <div class="q-pa-md">
    <div>
      <p class="bg-secondary shadow-5 text-center text-white">
        Cuadro de resumenn
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
      :data="data"
      :columns="columns"
      row-key="id_cotiza"
      :pagination.sync="pagination"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <!-- <q-td key="" :props="props"> </q-td> -->
          <q-td key="fe_cotiza" :props="props">
            {{ props.row.fe_cotiza }}
          </q-td>
          <q-td key="id_cotiza" :props="props">
            {{ props.row.id_cotiza }}
          </q-td>
          <q-td key="co_semcot" :props="props">
            {{ props.row.co_semcot }}
          </q-td>
          <q-td key="no_sigcli" :props="props">
            {{ props.row.no_sigcli }}
          </q-td>
          <q-td key="no_contac" :props="props">
            {{ props.row.no_contac }}
          </q-td>
          <q-td key="no_ubicac" :props="props">
            {{ props.row.no_ubicac }}
          </q-td>
          <q-td key="im_monsol" :props="props">
            <q-badge :style="coloreando(props.row.no_colsec)">
              {{ props.row.im_monsol }}
            </q-badge>
          </q-td>
          <q-td key="im_mondol" :props="props">
            {{ props.row.im_mondol }}
          </q-td>

          <q-td key="no_usuari" :props="props">
            {{ props.row.no_usuari }}
          </q-td>

          <q-td key="fe_regist" :props="props">
            {{ props.row.fe_regist }}
          </q-td>

          <q-td key="no_sigeva" :props="props">
            {{ props.row.no_sigeva }}
          </q-td>

          <q-td key="no_sigest" :props="props">
            {{ props.row.no_sigest }}
          </q-td>

          <q-td key="no_sigmot" :props="props">
            {{ props.row.no_sigmot }}
          </q-td>

          <!-- <q-td key="fe_regist" :props="props">
            <q-select
              v-model="model"
              dense
              options-dense
              :options="options"
              label="Standard"
            />
          </q-td>
          <q-td key="no_sigsve" :props="props">
            <q-select
              v-model="model"
              dense
              options-dense
              :options="options"
              label="Standard"
            />
          </q-td>
          <q-td key="no_coment" :props="props">
            <q-select
              v-model="model"
              dense
              options-dense
              :options="options"
              label="Standard"
            />
          </q-td> -->
          <!-- <q-td key="ca_consul" :props="props"> -->
          <!--            {{ props.row.ca_consul }}-->
          <!-- <q-btn round size="xs" :color="semaforo(props.row.co_semsve)" /> -->
          <!-- </q-td> -->
          <q-td key="no_coment" :props="props">
            {{ props.row.no_coment }}
          </q-td>
          <q-td key="ca_consul" :props="props">
            {{ props.row.ca_consul }}
          </q-td>
          <q-td key="co_percon" :props="props">
            <div class="q-gutter-xs">
              <q-btn dense size="sm" color="accent" icon="edit" />
              <q-btn dense size="sm" color="amber" icon="email" />
              <q-btn size="sm" dense color="blue" icon="thumb_up_alt" />
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
      <Emoticons @evtFechaCadAtrativos="emoti = false" :infoEmoti="infoEmoti" />
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
                v-model="item.il_activo"
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

    <q-dialog full-width v-model="envioMasivoCorreo">
      <Control />
    </q-dialog>
    <!--    {{ orange }}-->
    <!--    {{ dialogRegistrarCita }}-->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
const columns = [
  // {
  //   name: "",
  //   align: "left",
  //   sortable: true,
  //   label: "Nro.",
  //   field: "",
  //   style: "width: 15%"
  // },
  {
    name: "fe_cotiza",
    align: "left",
    sortable: true,
    label: "Fecha Cotiz.",
    field: "fe_cotiza"
  },
  {
    name: "id_cotiza",
    align: "left",
    sortable: true,
    label: "Cotizacion",
    field: "id_cotiza"
  },
  {
    name: "co_semcot",
    align: "left",
    sortable: true,
    label: "Semaforo",
    field: "co_semcot"
  },
  {
    name: "no_sigcli",
    align: "left",
    sortable: true,
    label: "Cliente",
    field: "no_sigcli"
  },
  {
    name: "no_contac",
    align: "left",
    sortable: true,
    label: "Contacto",
    field: "no_contac"
  },
  {
    name: "im_monsol",
    align: "left",
    sortable: true,
    label: "Monto S/",
    field: "im_monsol"
  },
  {
    name: "im_mondol",
    align: "left",
    sortable: true,
    label: "Monto $/",
    field: "im_mondol",
    style: "width: 15%"
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
    name: "no_sigeva",
    align: "left",
    sortable: true,
    label: "Evaluacion",
    field: "no_sigeva",
    style: "width: 15%"
  },
  {
    name: "no_sigest",
    align: "left",
    sortable: true,
    label: "Estados",
    field: "no_sigest"
  },
  {
    name: "no_sigmot",
    align: "center",
    sortable: true,
    label: "Motivo",
    field: "no_sigmot"
  },
  {
    name: "no_coment",
    align: "center",
    sortable: true,
    label: "Comentario",
    field: "no_coment"
  },
  {
    name: "ca_consul",
    align: "left",
    sortable: true,
    label: "Consultas",
    field: "ca_consul"
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
      model: "",
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      envioMasivoCorreo: false,
      correosVarios: [],
      teal: true,
      data: [],
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
        sortBy: "id_cotiza",
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
    ...mapActions("reque", ["seguimiento_cotizacion"]),
    enviarMasivos() {
      this.envioMasivoCorreo = true;
    },
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
    update(val) {
      console.log(val);
    }
  },
  components: {
    // Llamadas: () => import("./Llamadas"),
    // RegistrarCita: () => import("./RegistrarCita"),
    // DialogInformativo: () => import("./DialogInformativo"),
    // Emoticons: () => import("./Emoticons"),
    // Control: () => import("./Control")
    // CuadroResumen: () => import("./CuadroResumen")
    // AddRegistro: () => import("./Create")
  },
  async mounted() {
    this.data = await this.seguimiento_cotizacion();
  }
};
</script>
