<script setup>
// Import the favorites store
import { useFavoritesStore } from '../stores/favoritesStore'

// Import RouterLink
import { RouterLink } from 'vue-router'

// Movie card component
import MovieCard from '../components/MovieCard.vue'

// PrimeVue button
import Button from 'primevue/button'

// Access the store
const favoritesStore = useFavoritesStore()

// Remove a movie from favorites
function removeMovie(imdbID){

    favoritesStore.removeFavorite(imdbID)

}
</script>

<template>

<div class="favorites-page">

    <div class="page-header">

        <h1>❤️ My Favorites</h1>

        <p>
            Here you can see every movie you've saved.
        </p>

    </div>

    <!-- Show this if there are no favorites -->
    <div
        v-if="favoritesStore.favorites.length === 0"
        class="empty-state"
    >

        <i class="pi pi-heart-fill"></i>

        <h2>No favorite movies yet</h2>

        <p>
            Start searching and add some movies to your collection.
        </p>

        <RouterLink to="/search">

            <Button
                label="Search Movies"
                icon="pi pi-search"
            />

        </RouterLink>

    </div>

    <!-- Show favorites -->

    <div
        v-else
        class="movie-grid"
    >

        <div
            v-for="movie in favoritesStore.favorites"
            :key="movie.imdbID"
            class="favorite-card"
        >

            <MovieCard
                :movie="movie"
            />

            <Button

                label="Remove"

                icon="pi pi-trash"

                severity="danger"

                class="remove-button"

                @click="removeMovie(movie.imdbID)"

            />

        </div>

    </div>

</div>

</template>

<style scoped>

.favorites-page{

    max-width:1300px;
    margin:auto;

}

.page-header{

    text-align:center;
    margin-bottom:40px;

}

.page-header h1{

    color:white;
    font-size:46px;
    margin-bottom:10px;

}

.page-header p{

    color:#cbd5e1;

}

.empty-state{

    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding:80px 20px;
    text-align:center;

}

.empty-state i{

    font-size:80px;
    color:#ef4444;
    margin-bottom:20px;

}

.empty-state h2{

    color:white;
    margin-bottom:10px;

}

.empty-state p{

    color:#cbd5e1;
    margin-bottom:30px;

}

.movie-grid{

    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(230px,1fr));
    gap:30px;

}

.favorite-card{

    display:flex;
    flex-direction:column;
    gap:15px;

}

.remove-button{

    width:100%;

}

</style>