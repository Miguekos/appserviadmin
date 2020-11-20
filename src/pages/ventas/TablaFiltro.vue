<template>
  <div class="full-width">
    <div>
      <div>
        <p class="bg-secondary shadow-5 text-center text-white">
          Filtros Dinamicos
        </p>
      </div>
      <!--      <div class="q-ma-sm">-->
      <!--        <q-select-->
      <!--          transition-show="flip-up"-->
      <!--          transition-hide="flip-down"-->
      <!--          :options="listar_estado_seguimiento_clienteList"-->
      <!--          option-value="co_estsve"-->
      <!--          option-label="no_estsve"-->
      <!--          option-disable="inactive"-->
      <!--          emit-value-->
      <!--          map-options-->
      <!--          label="Estado"-->
      <!--          placeholder="Estado"-->
      <!--          dense-->
      <!--          v-model="listar_estado_seguimiento_clienteVar"-->
      <!--        />-->
      <!--      </div>-->
      <div class="q-ma-sm">
        <q-select
          transition-show="flip-up"
          transition-hide="flip-down"
          :options="listar_sector_economicoList"
          option-value="co_sececo"
          option-label="no_sececo"
          option-disable="inactive"
          emit-value
          map-options
          label="Sector Economico"
          placeholder="Sector Economico"
          dense
          options-dense
          v-model="listar_sector_economicoVar"
        />
      </div>

      <div class="q-ma-sm">
        <q-select
          transition-show="flip-up"
          transition-hide="flip-down"
          :options="info"
          option-value="co_arelab"
          option-label="no_arelab"
          option-disable="inactive"
          emit-value
          map-options
          label="Area"
          placeholder="Area"
          dense
          options-dense
          v-model="semaforo_seguimiento_clienteVar"
        />
      </div>
    </div>
    <div class="q-pa-xs flex flex-center q-gutter-md">
      <q-btn
        color="secondary"
        @click="showLoading()"
        icon-right="send"
        size="xs"
        label="Filtrar"
      />
      <q-btn
        color="red"
        @click="limpiarFiltros()"
        icon-right="close"
        size="xs"
        label="Limpiar Filtros"
      />
    </div>
    <!--    {{ info }}-->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("example", ["registrosFiltroEstados"])
  },
  data() {
    return {
      listar_estado_seguimiento_clienteList: [],
      listar_estado_seguimiento_clienteVar: null,
      listar_sector_economicoList: [],
      listar_sector_economicoVar: null,
      semaforo_seguimiento_clienteList: [],
      semaforo_seguimiento_clienteVar: null,
      loading: false,
      estadoFiltro: "",
      fechainicio: "",
      fechafin: "",
      cliente: "",
      size: ["xs", "sm", "md", "lg", "xl"],
      loading1: false,
      loading2: false,
      model: null,
      separator: "cell",
      options: [],
      info: []
    };
  },
  methods: {
    ...mapActions("example", [
      "registros",
      "listar_estado_seguimiento_cliente",
      "listar_sector_economico",
      "semaforo_seguimiento_cliente",
      "seguimiento_cliente",
      "listar_area_laboral"
    ]),
    coloreando(arg) {
      return `color: ${arg}`;
    },
    crearCotiza() {
      this.$router.push("/cotizacion/create");
    },
    CargaSniped() {
      // hiding in 2s
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 1000);
    },
    async showLoading() {
      this.$q.loading.show();
      await this.seguimiento_cliente({
        cliente: null,
        seguimiento: this.semaforo_seguimiento_clienteVar,
        economico: this.listar_sector_economicoVar,
        semoforo: null
      });
      this.$q.loading.hide();
    },
    async limpiarFiltros() {
      this.$q.loading.show();
      await this.seguimiento_cliente({
        cliente: null,
        seguimiento: null,
        economico: null,
        semoforo: null
      });
      this.semaforo_seguimiento_clienteVar = null;
      this.listar_sector_economicoVar = null;
      this.$q.loading.hide();
    }
  },
  async mounted() {
    this.$q.loading.show();
    // await this.registros();
    this.listar_estado_seguimiento_clienteList = await this.listar_estado_seguimiento_cliente();
    this.listar_sector_economicoList = await this.listar_sector_economico();
    this.semaforo_seguimiento_clienteList = await this.semaforo_seguimiento_cliente();
    this.listar_area_laboral()
      .then(resp => {
        console.log(resp);
        this.info = resp;
      })
      .catch(err => {
        console.log(err);
      });
    this.$q.loading.hide();
  },
  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  }
};
</script>
