<template>
  <div class="q-pa-md">
    <q-table
      dense
      title="Listado"
      :data="data"
      :columns="columns"
      row-key="name"
      :sort-method="customSort"
      binary-state-sort
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "Nro.",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "nu_reque",
          align: "left",
          label: "Nro. Requerimiento",
          field: "calories",
          sortable: true
        },
        {
          name: "fe_reque",
          align: "left",
          label: "Fecha Reque.",
          field: "fat",
          sortable: true
        },
        {
          name: "cliente",
          align: "left",
          label: "Cliente",
          field: "carbs",
          sortable: true
        },
        {
          name: "contacto",
          align: "left",
          label: "Contacto",
          field: "protein",
          sortable: true
        },
        {
          name: "di_pendi",
          align: "left",
          label: "Dias Pendientes",
          field: "sodium",
          sortable: true
        },
        {
          name: "fe_cotiz",
          align: "left",
          label: "Fecha Cotizacion",
          field: "calcium",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "estado",
          align: "left",
          label: "Estado",
          field: "iron",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "pdf",
          align: "left",
          label: "Pdf",
          field: "pdf",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      data: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%"
        }
      ]
    };
  },
  methods: {
    customSort(rows, sortBy, descending) {
      let data = [...rows];

      if (sortBy) {
        data.sort((a, b) => {
          let x = descending ? b : a;
          let y = descending ? a : b;
          if (sortBy === "name") {
            // string sort
            return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0;
          } else {
            // numeric sort
            return parseFloat(x[sortBy]) - parseFloat(y[sortBy]);
          }
        });
      }

      return data;
    }
  }
};
</script>
