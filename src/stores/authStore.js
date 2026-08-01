// Import defineStore from Pinia
import { defineStore } from 'pinia'

// Create the authentication store
export const useAuthStore = defineStore('auth', {

    // Store all the data we need
    state: () => ({
        isLoggedIn: false,
        username: ''
    }),

    actions: {

        // Log the user in
        login(username) {
            this.isLoggedIn = true
            this.username = username
        },

        // Log the user out
        logout() {
            this.isLoggedIn = false
            this.username = ''
        }

    }

})