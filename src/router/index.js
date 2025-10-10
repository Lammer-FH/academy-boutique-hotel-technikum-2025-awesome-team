import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ImpressumView from '../views/ImpressumView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/impressum',
            name: 'impressum',
            component: ImpressumView
        },

        {
        path: '/booking',
        name: 'booking',
        component: () => import('../views/BookingView.vue')
        },
        {
        path: '/booking/confirm',
        name: 'booking-confirm',
        component: () => import('../views/BookingConfirm.vue')
        },
        {
        path: '/admin/bookings',
        name: 'admin-bookings',
        component: () => import('../views/AdminBookings.vue')
        }


    ]
})

export default router
