import Vue from 'vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import MasterTemplate from '@/views/MasterTemplate.vue';

//import { _TOKEN } from '@/config';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: MasterTemplate,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
