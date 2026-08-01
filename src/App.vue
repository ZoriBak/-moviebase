<script setup>
// Import Vue's computed function
import { computed } from 'vue'

// Import the router components
import { RouterView, useRouter } from 'vue-router'

// Import our stores
import { useAuthStore } from './stores/authStore'

// PrimeVue components
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'

// Get access to the router
const router = useRouter()

// Get the authentication store
const authStore = useAuthStore()

// Navigation menu items
const menuItems = [
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => router.push('/')
    },
    {
        label: 'Search',
        icon: 'pi pi-search',
        command: () => router.push('/search')
    },
    {
        label: 'Favorites',
        icon: 'pi pi-heart',
        command: () => router.push('/favorites')
    }
]

// Display the username only when logged in
const username = computed(() => authStore.username)

// Logout button
function logout() {
    authStore.logout()
    router.push('/')
}
</script>

<template>

    <Menubar :model="menuItems">

        <template #end>

            <div class="menu-right">

                <span
                    v-if="authStore.isLoggedIn"
                    class="username"
                >
                    {{ username }}
                </span>

                <Button
                    v-if="authStore.isLoggedIn"
                    label="Logout"
                    icon="pi pi-sign-out"
                    severity="danger"
                    @click="logout"
                />

            </div>

        </template>

    </Menubar>

    <RouterView />

</template>

<style scoped>

.menu-right{
    display:flex;
    align-items:center;
    gap:15px;
}

.username{
    font-weight:bold;
}

</style>
