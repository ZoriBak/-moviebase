// Import the functions needed to create the router
import { createRouter, createWebHistory } from 'vue-router'

// Import all pages
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import MovieDetail from '../views/MovieDetail.vue'
import FavoritesView from '../views/FavoritesView.vue'

// Import the auth store so it can check if the user is logged in
import { useAuthStore } from '../stores/authStore'

// Create all the routes for the application
const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },

        {
            path: '/search',
            name: 'search',
            component: SearchView
        },

        {
            path: '/movie/:id',
            name: 'detail',
            component: MovieDetail
        },

        {
            path: '/favorites',
            name: 'favorites',
            component: FavoritesView,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

// Protect pages that require login
router.beforeEach((to) => {

    const authStore = useAuthStore()

    // If the page needs login and the user isn't logged in,
    // send them back to the home page
    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        return '/'
    }
})

export default router