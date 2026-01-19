import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ImpressumView from '../views/ImpressumView.vue'
import BookedView from '../views/BookedView.vue'
import UserView from '../views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/rooms', name: 'rooms', component: () => import('../views/RoomsView.vue') },
    { path: '/booking/:roomId', name: 'booking', component: () => import('../views/BookingView.vue') },
    { path: '/impressum', name: 'impressum', component: ImpressumView },
    { path: '/booked/:id', name: 'booked', component: BookedView, props: true },
    { path: '/user', name: 'user', component: UserView }
  ]
})

export default router
