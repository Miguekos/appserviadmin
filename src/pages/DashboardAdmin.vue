<!-- src/pages/Canvas.vue -->
<template lang="html">
  <div>
    <div id="chartContainer" style="height: 360px; width: 100%;"></div>
    asdasdas
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartOptions: {
        title: {
          text: "CanvasJS Chart in Quasar"
        },
        data: [
          {
            type: "column",
            dataPoints: [
              { x: 10, y: 71 },
              { x: 20, y: 55 },
              { x: 30, y: 50 },
              { x: 40, y: 65 },
              { x: 50, y: 95 },
              { x: 60, y: 68 },
              { x: 70, y: 28 },
              { x: 80, y: 34 },
              { x: 90, y: 14 }
            ]
          }
        ]
      },
      chart: null
    };
  },
  mounted() {
    this.chart = new this.$canvas.CanvasJS("chartContainer", this.chartOptions);
    this.chart.render();
  }
};
</script>
