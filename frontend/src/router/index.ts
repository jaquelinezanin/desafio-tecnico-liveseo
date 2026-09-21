import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/UsersView.vue'
import TasksView from '../views/TasksView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/users',
    },
    {
      path: '/users',
      component: UsersView,
    },
    {
      path: '/tasks',
      component: TasksView,
    },
  ],
})

export default router
