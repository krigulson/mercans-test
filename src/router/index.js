import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import json from '../static/menuLinks.json'

const routes = json.map(({ title, path }) => ({
  name: title,
  path: '/' + path,
  component: () => import('../views/QuickAccess.vue'),
  props: { title: title }
}));

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
  ]
})

export default router
