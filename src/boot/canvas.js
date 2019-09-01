import CanvasJS from "../../node_modules/canvasjs/dist/canvasjs.min.js";

export default ({ Vue }) => {
  Vue.prototype.$canvas = CanvasJS;
};

export { CanvasJS };
