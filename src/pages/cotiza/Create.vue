<template>
  <div>
    <!-- <q-page padding> -->
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Registrar</q-item-label>
          <q-item-label caption>Requerimientos</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section class="flex-center flex">
          <q-select
            filled
            dense
            v-model="model"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="options"
            @filter="filterFn"
            hint="Buscar por nombre de cliente"
            style="width: 250px; padding-bottom: 32px"
            option-value="no_client"
            option-label="no_client"
            @input="input2"
            auto-select
          />
          <!-- <div>
          Autocomplete:-->
          <!-- <p class="text-primary">{{ model }}</p> -->
          <!-- </div> -->
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section class="flex-center flex">
          <q-form @submit.prevent="onSubmit" class>
            <div class="row flex flex-center">
              <div class="q-pa-xs col-xs-12 col-sm-3">
                <q-input
                  dense
                  filled
                  v-model="model.fe_regist"
                  label="Fecha"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'No puede dejar el campo vacio'
                  ]"
                />
              </div>
              <div class="q-pa-xs col-xs-12 col-sm-6">
                <q-input
                  dense
                  filled
                  v-model="model.no_corele"
                  label="Cliente"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'No puede dejar el campo vacio'
                  ]"
                />
              </div>
              <div class="q-pa-xs col-xs-12 col-sm-3">
                <q-input
                  dense
                  filled
                  v-model="model.no_direcc"
                  label="Contacto"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'No puede dejar el campo vacio'
                  ]"
                />
              </div>
              <!-- <div class="q-pa-xs col-xs-12 col-sm-2">
                <q-input
                  dense
                  filled
                  v-model="model.nu_docide"
                  label="Direccion"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'No puede dejar el campo vacio'
                  ]"
                />
              </div>-->
              <div class="q-pa-xs col-xs-12 col-sm-6">
                <q-input
                  dense
                  filled
                  v-model="model.nu_docide"
                  label="Direccion"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'No puede dejar el campo vacio'
                  ]"
                />
                <q-input
                  dense
                  filled
                  v-model="model.nu_telefono"
                  label="Asunto"
                  lazy-rules
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'No puede dejar el campo vacio'
                  ]"
                />
              </div>
            </div>
            <div class="q-pb-sm">
              <div class="q-pa-xs col-xs-12 col-sm-2">
                <q-input
                  v-model="text"
                  filled
                  type="textarea"
                  label="Detalle"
                />
              </div>
            </div>
            <div class="flex flex-center">
              <q-btn
                label="Registrar"
                :loading="loading1"
                type="submit"
                color="primary"
              />
              <q-btn
                label="Cerrar"
                color="primary"
                flat
                @click="dialogCreate(false)"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-item-section>
      </q-item>
    </q-card>
    <!-- {{ options }} -->
    <!-- {{ model.no_client }} -->
    <!-- {{ name }} -->
    <!-- </q-page> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("clientes", ["ClientesFiltro", "asdClientes"])
  },
  data() {
    return {
      loading: false,
      loading1: false,
      name: "",
      dni: "",
      selectModel: "",
      selectModel2: null,
      text: "",
      model: {
        no_client: "",
        no_corele: "",
        no_direcc: "",
        nu_docide: "",
        nu_telefono: ""
      },
      lotrOpts: [],
      options: [],
      notif: () => {}
    };
  },
  methods: {
    ...mapActions("clientes", ["getClientes"]),
    ...mapActions("example", [
      "registrarCotizacion",
      "dialogCreate",
      "registros"
    ]),
    filterFn(val, update, abort) {
      const asd = this.lotrOpts;
      if (val.length < 1) {
        abort();
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options = asd.filter(v =>
          v.no_client.toLowerCase().includes(needle)
        );
      });
    },
    input2(val) {
      this.notif();
      this.notif = this.$q.notify({
        message: `Cliente: ${JSON.stringify(val.no_client)} seleccionado.`,
        timeout: 1000,
        color: "secondary"
      });
    },
    async onSubmit() {
      this.loading = true;
      this.loading1 = true;
      this.registrarCotizacion({
        ...this.model,
        text: this.text
      })
        .then(resp => {
          console.log(resp);
          this.$q.notify({
            color: "green-5",
            textColor: "white",
            icon: "fas fa-check",
            message: "Se registro la cotizacion correctamente"
          });
          this.registros().then(response => {
            console.log(response);
            // this.dialogCreate(false);
            // this.loading1 = false;
          });
          // this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "fas fa-exclamation-triangle",
            message: "Se produjo un error al tratar de registrar"
          });
        })
        .finally(() => {
          this.loading1 = false;
          this.loading = false;
          this.dialogCreate(false);
        });
    }
  },
  async created() {
    // this.$q.loading.show();
    await this.getClientes();
    this.options = await this.asdClientes;
    this.lotrOpts = await this.asdClientes;
    // this.$q.loading.hide();
  }
};
</script>
