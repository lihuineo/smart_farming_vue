import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/reset.css';
// 引入全局样式
import '@/styles/index.less';
import './assets/animate.css';
import * as echarts from 'echarts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style.css';
import bus from './bus';
import mqtt from './utils/mqtt.min.js';
import dataV from '@jiaminghi/data-view';
import QtEchart from '@/components/chart/chart.vue';

import { MQTT_URL, MQTT_OPTIONS, MQTT_TOPIC } from '@/utils/mqttConfig.js';
// import { createConnect, doSubscribe } from '@/utils/mqttFunction.js'
const keys = Object.keys(MQTT_TOPIC);
const client = mqtt.connect(MQTT_URL, MQTT_OPTIONS);

Vue.prototype.$mqttClient = client;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.use(dataV);
Vue.prototype.$EventBus = bus;
Vue.component('QtEchart', QtEchart);
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
