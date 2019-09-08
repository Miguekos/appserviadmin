<template>
  <div>
    <q-page padding>
      <q-card class="my-card">
        <q-item class="bg-custom4">
          <q-item-section>
            <q-item-label>Registrar</q-item-label>
            <q-item-label caption>Requerimientos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <!-- {{ info }} -->
          <!-- {{ ClientesFiltro }} -->
          <q-item-section class="flex-center flex">
            <q-select
              filled
              v-model="model"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              label="Simple filter"
              :options="options"
              @filter="filterFn"
              style="width: 250px"
              behavior="menu"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">No results</q-item-section>
                </q-item>
              </template>
            </q-select>
            {{ $data }}
          </q-item-section>
        </q-item>
      </q-card>
    </q-page>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

export default {
  computed: {
    ...mapGetters("clientes", ["ClientesFiltro"])
  },
  data() {
    return {
      model: null,
      stringOptions: null,
      options: null
    };
  },
  methods: {
    ...mapActions("clientes", ["getClientes"]),
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options = this.stringOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = this.stringOptions.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    }
  },
  async created() {
    await this.getClientes();
    this.stringOptions = await this.ClientesFiltro;
    this.options = await this.ClientesFiltro;
    // for (let x = 0; x < ClientesFiltro.length; x++) {
    //   const elemet = ClientesFiltro[x];
    //   console.log(elemet);
    //   return elemet;
    // }
  }
};
</script>
