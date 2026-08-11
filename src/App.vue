<script setup>

// Vue
import { computed } from 'vue'

// Vue Router
import { RouterView, useRouter, useRoute } from 'vue-router'

// Pinia
import { useAuthStore } from './stores/authStore'

// PrimeVue
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'

// Router
const router = useRouter()
const route = useRoute()

// Auth store
const authStore = useAuthStore()

// Username
const username = computed(() => authStore.username)


// =========================
// NAVIGATION
// =========================

const links = [

    {
        label: 'Home',
        icon: 'pi pi-home',

        command: () => {

            router.push('/')

        }

    },

    {
        label: 'Search',
        icon: 'pi pi-search',

        command: () => {

            router.push('/search')

        }

    },

    {
        label: 'Favorites',
        icon: 'pi pi-heart',

        command: () => {

            /*
             * If the user is logged in,
             * open the Favorites page.
             *
             * If the user is logged out,
             * send them back to the login page.
             */

            if (authStore.isLoggedIn) {

                router.push('/favorites')

            } else {

                router.push('/')

            }

        }

    }

]


// =========================
// ACTIVE NAVIGATION
// =========================

function isActive(path) {

    return route.path === path

}


// =========================
// LOGOUT
// =========================

function logout() {

    authStore.logout()

    router.push('/')

}


// =========================
// LOGIN BUTTON
// =========================

function goToLogin() {

    router.push('/')

}

</script>


<template>

<div class="app">


    <!-- ========================= -->
    <!-- NAVBAR -->
    <!-- ========================= -->

    <header class="navbar">


        <!-- LOGO -->

        <div
            class="logo"
            @click="router.push('/')"
        >

            <span class="logo-icon">

                ▶

            </span>

            <span class="logo-text">

                MovieBase

            </span>

        </div>


        <!-- ========================= -->
        <!-- PRIMEVUE MENUBAR -->
        <!-- ========================= -->

        <Menubar
            :model="links"
            class="movie-menu"
        >

            <template #item="{ item, props }">

                <a
                    v-bind="props.action"
                    class="menu-item"
                    :class="{

                        active:

                            item.label === 'Home'
                                ? isActive('/')

                                : item.label === 'Search'
                                    ? isActive('/search')

                                    : item.label === 'Favorites'
                                        ? isActive('/favorites')

                                        : false

                    }"
                >

                    <i
                        v-if="item.icon"
                        :class="item.icon"
                    ></i>

                    <span>

                        {{ item.label }}

                    </span>

                </a>

            </template>

        </Menubar>


        <!-- ========================= -->
        <!-- RIGHT SIDE -->
        <!-- ========================= -->

        <div class="right-side">


            <!-- LOGGED IN -->

            <template v-if="authStore.isLoggedIn">


                <!-- USERNAME -->

                <div class="user-badge">

                    <i class="pi pi-user"></i>

                    <span>

                        {{ username }}

                    </span>

                </div>


                <!-- LOGOUT -->

                <Button

                    label="Logout"

                    icon="pi pi-sign-out"

                    class="logout-button"

                    @click="logout"

                />

            </template>


            <!-- LOGGED OUT -->

            <template v-else>

                <Button

                    label="Login"

                    icon="pi pi-user"

                    class="login-button"

                    @click="goToLogin"

                />

            </template>


        </div>


    </header>


    <!-- ========================= -->
    <!-- PAGE CONTENT -->
    <!-- ========================= -->

    <main class="page-content">

        <RouterView />

    </main>


</div>

</template>


<style scoped>


/* ========================= */
/* APP */
/* ========================= */

.app {

    min-height:100vh;

    background:#090909;

    color:white;

}


/* ========================= */
/* NAVBAR */
/* ========================= */

.navbar {

    position:sticky;

    top:0;

    z-index:1000;

    display:flex;

    align-items:center;

    gap:30px;

    min-height:76px;

    padding:14px 45px;

    background:rgba(9,9,9,.96);

    backdrop-filter:blur(20px);

    -webkit-backdrop-filter:blur(20px);

    border-bottom:1px solid rgba(255,255,255,.06);

    box-shadow:

        0 8px 30px rgba(0,0,0,.35);

}


/* ========================= */
/* LOGO */
/* ========================= */

.logo {

    display:flex;

    align-items:center;

    gap:10px;

    color:white;

    font-size:30px;

    font-weight:900;

    letter-spacing:-1px;

    cursor:pointer;

    white-space:nowrap;

    transition:.3s;

}

.logo:hover {

    transform:scale(1.03);

}


/* Red movie icon */

.logo-icon {

    width:38px;

    height:38px;

    display:flex;

    align-items:center;

    justify-content:center;

    background:#E50914;

    color:white;

    border-radius:9px;

    font-size:17px;

    box-shadow:

        0 8px 20px rgba(229,9,20,.3);

    transition:.3s;

}

.logo:hover .logo-icon {

    transform:rotate(-4deg);

    box-shadow:

        0 10px 25px rgba(229,9,20,.45);

}


/* ========================= */
/* MENUBAR */
/* ========================= */

.movie-menu {

    flex:1;

    border:none !important;

    background:transparent !important;

    padding:0 !important;

    display:flex;

    justify-content:center;

}


/* PrimeVue menu list */

:deep(.movie-menu .p-menubar-root-list) {

    gap:6px;

    background:transparent !important;

}


/* Remove PrimeVue background */

:deep(.movie-menu .p-menubar-item) {

    background:transparent !important;

}


/* Menu item */

.menu-item {

    display:flex;

    align-items:center;

    justify-content:center;

    gap:8px;

    padding:11px 18px;

    border-radius:12px;

    color:#b8b8b8;

    text-decoration:none;

    cursor:pointer;

    font-size:15px;

    font-weight:600;

    transition:

        background .25s ease,

        color .25s ease,

        transform .25s ease,

        box-shadow .25s ease;

}


/* Hover */

.menu-item:hover {

    background:rgba(229,9,20,.12);

    color:white;

    transform:translateY(-1px);

}


/* Active */

.menu-item.active {

    background:#E50914;

    color:white;

    box-shadow:

        0 8px 25px rgba(229,9,20,.25);

}


/* Active hover */

.menu-item.active:hover {

    background:#ff2733;

    color:white;

}


/* Icons */

.menu-item i {

    font-size:15px;

}


/* ========================= */
/* RIGHT SIDE */
/* ========================= */

.right-side {

    display:flex;

    align-items:center;

    justify-content:flex-end;

    gap:14px;

    min-width:max-content;

}


/* ========================= */
/* USER BADGE */
/* ========================= */

.user-badge {

    display:flex;

    align-items:center;

    gap:9px;

    padding:9px 14px;

    background:#181818;

    border:1px solid rgba(255,255,255,.07);

    border-radius:12px;

    color:white;

    font-weight:600;

    transition:.3s;

}


.user-badge:hover {

    background:#202020;

    border-color:rgba(255,255,255,.12);

}


.user-badge i {

    color:#E50914;

}


/* ========================= */
/* LOGIN BUTTON */
/* ========================= */

:deep(.login-button) {

    background:#E50914 !important;

    border:1px solid #E50914 !important;

    color:white !important;

    border-radius:12px !important;

    font-weight:700;

    padding:10px 18px;

    transition:.3s;

}


:deep(.login-button:hover) {

    background:#ff2733 !important;

    border-color:#ff2733 !important;

    color:white !important;

    transform:translateY(-2px);

    box-shadow:

        0 10px 25px rgba(229,9,20,.35);

}


/* ========================= */
/* LOGOUT BUTTON */
/* ========================= */

:deep(.logout-button) {

    background:#E50914 !important;

    border:1px solid #E50914 !important;

    color:white !important;

    border-radius:12px !important;

    font-weight:700;

    padding:10px 18px;

    transition:.3s;

}


:deep(.logout-button:hover) {

    background:#ff2733 !important;

    border-color:#ff2733 !important;

    color:white !important;

    transform:translateY(-2px);

    box-shadow:

        0 10px 25px rgba(229,9,20,.35);

}


/* ========================= */
/* PAGE CONTENT */
/* ========================= */

.page-content {

    min-height:calc(100vh - 76px);

    width:100%;

}


/* ========================= */
/* MOBILE */
/* ========================= */

@media(max-width:1000px) {


    .navbar {

        flex-wrap:wrap;

        justify-content:center;

        gap:15px;

        padding:15px 20px;

    }


    .logo {

        width:100%;

        justify-content:center;

    }


    .movie-menu {

        flex:none;

        width:auto;

    }


    .right-side {

        width:100%;

        justify-content:center;

    }


}


@media(max-width:650px) {


    .navbar {

        padding:12px 15px;

    }


    .logo {

        font-size:25px;

    }


    .logo-icon {

        width:34px;

        height:34px;

    }


    .menu-item {

        padding:9px 11px;

        font-size:13px;

    }


    .menu-item i {

        font-size:13px;

    }


    .user-badge {

        padding:8px 10px;

    }


    :deep(.login-button),
    :deep(.logout-button) {

        padding:9px 12px;

    }

}

</style>