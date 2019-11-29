<template>
  <div class="q-pa-md">
    <q-table
      :data="data"
      :columns="columns"
      title="Cliente"
      :rows-per-page-options="[]"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="desc" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="calories" :props="props">
            {{ props.row.calories }}
            <q-popup-edit v-model="props.row.calories">
              <q-input v-model="props.row.calories" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="fat" :props="props">
            {{ props.row.fat }}
            <q-popup-edit v-model="props.row.fat">
              <q-input v-model="props.row.fat" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="carbs" :props="props">
            {{ props.row.carbs }}
            <q-popup-edit v-model="props.row.carbs" disable>
              <q-input v-model="props.row.carbs" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="protein" :props="props">
            {{ props.row.protein }}
            <q-popup-edit v-model="props.row.protein">
              <q-input v-model="props.row.protein" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="sodium" :props="props">
            {{ props.row.sodium }}
            <q-popup-edit v-model="props.row.sodium">
              <q-input v-model="props.row.sodium" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="calcium" :props="props">
            {{ props.row.calcium }}
            <q-popup-edit v-model="props.row.calcium">
              <q-input v-model="props.row.calcium" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="iron" :props="props">
            {{ props.row.iron }}
            <q-popup-edit v-model="props.row.iron">
              <q-input v-model="props.row.iron" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="commend" :props="props">
            {{ props.row.commend }}
            <q-popup-edit v-model="props.row.commend">
              <q-input v-model="props.row.commend" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="estado" :props="props">
              <q-select
                borderless
                dense
                options-dense
                v-model="props.row.estado"
                :options="options"
                transition-show="flip-up"
                transition-hide="flip-down"
              />
          </q-td>
          <q-td key="botones" :props="props">
            <div class="q-pa-xs q-gutter-xs">
              <q-btn dense color="primary" icon="shopping_cart" />
              <q-btn dense color="secondary" icon="navigation" />
              <q-btn dense color="amber" glossy text-color="black" icon="layers_clear" />
              <q-btn dense color="brown-5" icon="directions" />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
const columns = [
  {
    name: "desc",
    align: "left",
    label: "Nro",
    field: "name"
  },
  { name: "calories", label: "Cliente", field: "calories" },
  { name: "fat", label: "Contacto", field: "fat" },
  { name: "carbs", label: "Correo", field: "carbs" },
  { name: "protein", label: "Area", field: "protein" },
  { name: "sodium", label: "Distrito", field: "sodium" },
  { name: "calcium", label: "Sector", field: "calcium" },
  { name: "iron", label: "Cantidad Consultas", field: "iron" },
  { name: "commend", label: "Comentarios", field: "commend" },
  { name: "estado", label: "Estados", field: "estado" },
  { name: "botones", label: "Accions", field: "botones" }
];

const data = [
  {
    name: "1",
    calories: "Frozen",
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
    commend: "",
    estado: "NR - No Requieren",
    botonoes: []
  },
  {
    name: "2",
    calories: "Ice",
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
    commend: "",
    estado: "NR - No Requieren",
    botonoes: []
  },
  {
    name: "3",
    calories: "Eclair",
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
    commend: "",
    estado: "NR - No Requieren",
    botonoes: []
  },
  {
    name: "4",
    calories: "Cupcake",
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
    commend: "",
    estado: "NR - No Requieren",
    botonoes: []
  },
  {
    name: "5",
    calories: "Gingerbread",
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
    commend: "",
    estado: "NR - No Requieren",
    botonoes: []
  },
  {
    name: "6",
    calories: "Jelly",
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
    commend: "",
    estado: "NR - No Requieren",
    botonoes: []
  },
  {
    name: "7",
    calories: "Lollipop",
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
    commend: "",
    estado: "NR - No Requieren",
    botonoes: []
  },
  {
    name: "8",
    calories: "Honeycomb",
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
    commend: "",
    estado: "NR - No Requieren",
    botonoes: []
  },
  {
    name: "9",
    calories: "Donut",
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
    commend: "",
    estado: "NR - No Requieren",
    botonoes: []
  },
  {
    name: "10",
    calories: "KitKat",
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
    commend: "",
    estado: "NR - No Requieren",
    botonoes: []
  }
];

export default {
  data() {
    return {
      data,
      columns,
      options: [
        "CA - Cita Anulada",
        "CC - Cita Concretada",
        "CP - Cliente Potencial",
        "NC - No Contesta",
        "NR - No Requieren"
      ]
    };
  }
};
</script>
