// Import defineStore from Pinia
import { defineStore } from 'pinia'

// Create the favorites store
export const useFavoritesStore = defineStore('favorites', {

    // Store all favorite movies
    state: () => ({
        favorites: []
    }),

    getters: {

        // Check if a movie is already saved
        isFavorite: (state) => (imdbID) => {
            return state.favorites.some(movie => movie.imdbID === imdbID)
        }

    },

    actions: {

        // Add a movie if it isn't already in favorites
        addFavorite(movie) {

            if (!this.isFavorite(movie.imdbID)) {
                this.favorites.push(movie)
            }

        },

        // Remove a movie from favorites
        removeFavorite(imdbID) {

            this.favorites = this.favorites.filter(
                movie => movie.imdbID !== imdbID
            )

        }

    }

})