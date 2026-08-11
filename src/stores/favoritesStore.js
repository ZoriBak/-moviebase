import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {

    state:() => ({

        favorites:[]

    }),

    getters:{

        isFavorite:(state) => {

            return (imdbID) => {

                return state.favorites.some(
                    movie => movie.imdbID === imdbID
                )

            }

        }

    },

    actions:{

        addFavorite(movie){

            if(!this.favorites.some(
                item => item.imdbID === movie.imdbID
            )){

                this.favorites.push(movie)

            }

        },

        removeFavorite(imdbID){

            this.favorites =
                this.favorites.filter(
                    movie => movie.imdbID !== imdbID
                )

        }

    }

})