<template>
  <div class="container">
    <line-chart :chartdata="chartdata" :options="options" />
  </div>
</template>

<script>
import LineChart from "./Chart.vue";

export default {
  name: "LineChartContainer",
  components: { LineChart },
  data: () => ({
    loaded: false,
    chartdata: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#21ba45",
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  async mounted() {
    // this.loaded = false;
    // try {
    //   const { userlist } = await fetch("/api/userlist");
    //   this.chartdata = userlist;
    //   this.loaded = true;
    // } catch (e) {
    //   console.error(e);
    // }
  }
};
</script>
