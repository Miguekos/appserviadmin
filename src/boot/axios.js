import axios from "axios";
axios.defaults.withCredentials = true;
// import qs from "qs";
// import proxy from "http-proxy-middleware";
// // var proxy = require('http-proxy-middleware');
// proxy("/api", {
//   target: "http://127.0.0.1:3000",
//   changeOrigin: true, // needed for virtual hosted sites
//   // ws: true, // proxy websockets
//   pathRewrite: {
//     '^/api/': '', // rewrite path
//   },
// });

const axiosInstance = axios.create({
  // paramsSerializer: params => {
  //   return qs.stringify(params, { arrayFormat: "repeat" });
  // },
  // proxy: {login
  //   host: '127.0.0.1',
  //   port: 9000
  // }
  // baseURL: "http://95.111.235.214:4100"
  // baseURL: "http://192.168.0.32:4100"
  baseURL: "https://api.apps.com.pe/sjservi"
});

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance;
};

export { axiosInstance };
