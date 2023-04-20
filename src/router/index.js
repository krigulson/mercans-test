import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import json from '../static/menuLinks.json'
import toPascalCase from '../helpers/pascalCase'

const routes = json.map(({ title, path }) => ({
  name: title,
  path: '/' + path,
  component: () => import(`../views/${toPascalCase(title)}.vue`),
  props: { title: title }
}));

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "is-active",
  linkExactActiveClass: "is-exact-active",
  routes: [
    ...routes,
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import('../views/PageNotFound.vue')
    },
  ]
})

export default router
