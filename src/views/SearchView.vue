<script setup>
// Vue
import { ref } from 'vue'

// Components
import MovieCard from '../components/MovieCard.vue'

// PrimeVue
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'

// API
const API_KEY = 'efb26b8d'

// Search
const search = ref('')

// Movies
const movies = ref([])

// Loading
const loading = ref(false)

// Error
const error = ref('')

// Trending movies
const trending = [
    'Batman',
    'Interstellar',
    'Avatar',
    'Dune',
    'Spider-Man',
    'Harry Potter',
    'Inception',
    'The Dark Knight'
]

// Search movies
async function searchMovies(movieName = search.value){

    if(!movieName.trim()) return

    search.value = movieName

    loading.value = true
    error.value = ''
    movies.value = []

    try{

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`
        )

        const data = await response.json()

        if(data.Response === 'True'){

            movies.value = data.Search

        }else{

            error.value = data.Error

        }

    }catch{

        error.value = 'Unable to load movies.'

    }finally{

        loading.value = false

    }

}
</script>

<template>

<div class="search-page">

    <!-- HERO -->

    <section class="hero">

        <span class="hero-tag">

            🎬 MOVIEBASE

        </span>

        <h1>

            Discover
            <span>Amazing Movies</span>

        </h1>

        <p>

            Browse thousands of movies, discover classics,
            and build your own personal movie collection.

        </p>

    </section>

    <!-- SEARCH -->

    <section class="search-section">

        <div class="search-box">

            <InputText

                v-model="search"

                placeholder="Search for any movie..."

                @keyup.enter="searchMovies()"

            />

            <Button

                label="Search"

                icon="pi pi-search"

                class="search-button"

                @click="searchMovies()"

            />

        </div>

    </section>

    <!-- TRENDING -->

    <section class="trending">

        <h2>

            🔥 Trending Searches

        </h2>

        <div class="chips">

            <button

                v-for="movie in trending"

                :key="movie"

                @click="searchMovies(movie)"

            >

                {{ movie }}

            </button>

        </div>

    </section>

    <!-- LOADING -->

    <div
        v-if="loading"
        class="loading"
    >

        <ProgressSpinner />

        <p>

            Loading movies...

        </p>

    </div>

    <!-- ERROR -->

    <div
        v-if="error"
        class="error-box"
    >

        <i class="pi pi-exclamation-circle"></i>

        <h3>

            No movies found

        </h3>

        <p>

            {{ error }}

        </p>

    </div>

    <!-- RESULTS -->

    <section
        v-if="movies.length"
        class="results"
    >

        <div class="results-header">

            <h2>

                Search Results

            </h2>

            <span>

                {{ movies.length }} Movies

            </span>

        </div>

        <TransitionGroup

            name="fade"

            tag="div"

            class="movie-grid"

        >

            <MovieCard

                v-for="movie in movies"

                :key="movie.imdbID"

                :movie="movie"

            />

        </TransitionGroup>

    </section>

</div>

</template>

<style scoped>

.search-page{

    max-width:1400px;

    margin:auto;

    padding-bottom:60px;

}

/* HERO */

.hero{

    text-align:center;

    padding:70px 20px;

    margin-bottom:50px;

}

.hero-tag{

    display:inline-flex;

    align-items:center;

    gap:10px;

    background:rgba(229,9,20,.12);

    color:#E50914;

    padding:10px 22px;

    border-radius:999px;

    font-weight:700;

    letter-spacing:2px;

    margin-bottom:25px;

}

.hero h1{

    font-size:72px;

    font-weight:900;

    line-height:1;

    color:white;

    margin-bottom:25px;

}

.hero h1 span{

    display:block;

    color:#E50914;

}

.hero p{

    color:#b5b5b5;

    font-size:21px;

    line-height:1.8;

    max-width:720px;

    margin:auto;

}

/* SEARCH */

.search-section{

    display:flex;

    justify-content:center;

    margin-bottom:60px;

}

.search-box{

    width:100%;

    max-width:900px;

    display:flex;

    gap:18px;

}

:deep(.p-inputtext){

    flex:1;

    height:62px;

    background:#181818;

    border:1px solid #303030;

    color:white;

    border-radius:16px;

    padding-left:20px;

    font-size:17px;

}

:deep(.p-inputtext:focus){

    border-color:#E50914;

    box-shadow:0 0 20px rgba(229,9,20,.25);

}

/* ========================= */
/* SEARCH BUTTON */
/* ========================= */

:deep(.search-button.p-button){

    background:#E50914 !important;

    border:1px solid #E50914 !important;

    color:#ffffff !important;

    border-radius:16px !important;

    height:62px;

    padding:0 28px;

    font-weight:700;

    transition:.3s;

}

:deep(.search-button.p-button:hover){

    background:#ff2733 !important;

    border-color:#ff2733 !important;

    color:white !important;

    transform:translateY(-3px);

    box-shadow:0 12px 30px rgba(229,9,20,.45);

}

:deep(.search-button .p-button-icon),
:deep(.search-button .p-button-label){

    color:white !important;

}

/* TRENDING */

.trending{

    margin-bottom:60px;

}

.trending h2{

    color:white;

    margin-bottom:22px;

    text-align:center;

}

.chips{

    display:flex;

    justify-content:center;

    flex-wrap:wrap;

    gap:15px;

}

.chips button{

    background:#1d1d1d;

    color:white;

    border:none;

    border-radius:999px;

    padding:12px 22px;

    cursor:pointer;

    transition:.3s;

    font-size:15px;

}

.chips button:hover{

    background:#E50914;

    transform:translateY(-4px);

}

/* RESULTS */

.results{

    margin-top:70px;

}

.results-header{

    display:flex;

    justify-content:space-between;

    align-items:center;

    margin-bottom:35px;

}

.results-header h2{

    color:white;

    font-size:34px;

}

.results-header span{

    background:#E50914;

    color:white;

    padding:10px 18px;

    border-radius:999px;

    font-weight:700;

}

.movie-grid{

    display:grid;

    grid-template-columns:repeat(auto-fill,minmax(240px,1fr));

    gap:30px;

}

/* LOADING */

.loading{

    display:flex;

    flex-direction:column;

    align-items:center;

    gap:20px;

    margin:80px 0;

}

.loading p{

    color:#b3b3b3;

}

/* ERROR */

.error-box{

    margin:80px auto;

    max-width:500px;

    background:#181818;

    border:1px solid rgba(255,255,255,.06);

    border-radius:20px;

    padding:45px;

    text-align:center;

}

.error-box i{

    font-size:55px;

    color:#E50914;

    margin-bottom:20px;

}

.error-box h3{

    color:white;

    margin-bottom:10px;

}

.error-box p{

    color:#b3b3b3;

}

/* ANIMATION */

.fade-enter-active,

.fade-leave-active{

    transition:.5s;

}

.fade-enter-from,

.fade-leave-to{

    opacity:0;

    transform:translateY(25px);

}

/* MOBILE */

@media(max-width:900px){

.hero{

    padding:40px 10px;

}

.hero h1{

    font-size:48px;

}

.hero p{

    font-size:18px;

}

.search-box{

    flex-direction:column;

}

.results-header{

    flex-direction:column;

    gap:15px;

}

}

</style>