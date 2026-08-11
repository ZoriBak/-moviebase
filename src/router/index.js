import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import MovieDetail from '../views/MovieDetail.vue'
import FavoritesView from '../views/FavoritesView.vue'

import { useAuthStore } from '../stores/authStore'

const routes = [

    {
        path:'/',
        name:'home',
        component:HomeView
    },

    {
        path:'/search',
        name:'search',
        component:SearchView
    },

    {
        path:'/movie/:id',
        name:'detail',
        component:MovieDetail
    },

    {
        path:'/favorites',
        name:'favorites',
        component:FavoritesView,
        meta:{
            requiresAuth:true
        }
    }

]

const router = createRouter({

    history:createWebHistory(),

    routes

})

router.beforeEach((to) => {

    const authStore = useAuthStore()

    if(to.meta.requiresAuth && !authStore.isLoggedIn){

        return {
            name:'home'
        }

    }

    return true

})

export default router