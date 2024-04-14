import './assets/all.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router';
import zh from './languages/zh-TW.json';
import en from './languages/en.json';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    'zh-TW': zh,
  },
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);
app.mount('#app');
