import Vue from 'vue';
import Vuetify, {VApp, VContainer, VContent} from 'vuetify/lib';
import App from './App.vue';

Vue.use(Vuetify, {
  components: {
    VApp, VContainer, VContent
  }
});

const vuetify = new Vuetify();

new Vue({
  // @ts-ignore
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

if ((module as any).hot) {
  (module as any).hot.accept();
}
