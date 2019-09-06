<template>
  <q-page padding>
    <q-card class="my-card">
      <q-item class="bg-custom4">
        <q-item-section>
          <q-item-label>Registrar</q-item-label>
          <q-item-label caption>Requerimientos</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        {{ ClientesFiltro }}
        <q-item-section class="flex-center flex">
          <template>
            <div class="q-pa-md">
              <div class="q-gutter-md row">
                <q-select
                  filled
                  dense
                  v-model="model"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  :options="ClientesFiltro"
                  @filter="filterFn"
                  hint="Buscar Cliente"
                  style="width: 250px; padding-bottom: 32px"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
          </template>
        </q-item-section>
      </q-item>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

export default {
  computed: {
    ...mapGetters("clientes", ["ClientesFiltro"])
  },
  data() {
    return {
      model: null,
      options: stringOptions
    };
  },
  methods: {
    ...mapActions("clientes", ["getClientes"]),
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.options = stringOptions.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
      console.log(abort);
    }
  },
  async created() {
    await this.getClientes();
    // for (let x = 0; x < ClientesFiltro.length; x++) {
    //   const elemet = ClientesFiltro[x];
    //   console.log(elemet);
    //   return elemet;
    // }
  }
};
</script>
