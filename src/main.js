import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.vue'
import router from './router'
import * as VueGoogleMaps from "vue2-google-maps" // Import package
import Geocoder from "@pderas/vue2-geocoder";

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDR6ETZ7j0CJxj3mIye-BF8uBCfanRD9jU",
    libraries: "places"
  }
});

Vue.use(Geocoder, {
  defaultCountryCode: null, // e.g. 'CA'
  defaultLanguage:    null, // e.g. 'en'
  defaultMode:        'address', // or 'lat-lng'
  googleMapsApiKey:   "AIzaSyDR6ETZ7j0CJxj3mIye-BF8uBCfanRD9jU"
});


new Vue({
  router, VueGoogleMaps, Geocoder,
  render: h => h(App)
}).$mount('#app')
