<script setup>
// Vue
import { ref, computed, onMounted } from 'vue'

// Router
import { useRoute, useRouter } from 'vue-router'

// GSAP
import { gsap } from 'gsap'

// Pinia
import { useFavoritesStore } from '../stores/favoritesStore'

// PrimeVue
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import ProgressSpinner from 'primevue/progressspinner'

// API
const API_KEY = 'efb26b8d'

// Router
const route = useRoute()
const router = useRouter()

// Store
const favoritesStore = useFavoritesStore()

// State
const movie = ref(null)
const loading = ref(true)
const error = ref('')

// Favorite status
const favorite = computed(() => {

    if (!movie.value) return false

    return favoritesStore.isFavorite(movie.value.imdbID)

})

// Toggle favorite
function toggleFavorite() {

    if (favorite.value) {

        favoritesStore.removeFavorite(movie.value.imdbID)

    } else {

        favoritesStore.addFavorite(movie.value)

    }

}

// Load movie
async function loadMovie() {

    loading.value = true
    error.value = ''

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?i=${route.params.id}&apikey=${API_KEY}`
        )

        const data = await response.json()

        if (data.Response === 'True') {

            movie.value = data

        } else {

            error.value = data.Error

        }

    } catch {

        error.value = 'Unable to load movie.'

    } finally {

        loading.value = false

        gsap.from('.movie-wrapper', {
            opacity: 0,
            y: 50,
            duration: 0.9,
            ease: 'power3.out'
        })

    }

}

onMounted(loadMovie)

</script>

<template>

<div class="detail-page">

    <Button
        icon="pi pi-arrow-left"
        label="Back to Search"
        class="back-button"
        @click="router.push('/search')"
    />

    <div
        v-if="loading"
        class="loading"
    >

        <ProgressSpinner />

    </div>

    <div
        v-else-if="error"
        class="error-card"
    >

        <i class="pi pi-exclamation-circle"></i>

        <h2>

            Unable to load movie

        </h2>

        <p>

            {{ error }}

        </p>

    </div>

    <div
        v-else-if="movie"
        class="movie-background"
        :style="{ backgroundImage: `url(${movie.Poster})` }"
    >

        <div class="background-overlay"></div>

        <div class="movie-wrapper">

            <div class="poster-section">

                <img
                    :src="movie.Poster"
                    :alt="movie.Title"
                >

            </div>

            <div class="info-section">

                <div class="top">

                    <div>

                        <h1>

                            {{ movie.Title }}

                        </h1>

                        <p class="subtitle">

                            {{ movie.Year }}

                            •

                            {{ movie.Runtime }}

                            •

                            {{ movie.Rated }}

                        </p>

                    </div>

                    <div class="rating">

                        <span class="rating-label">

                            IMDb

                        </span>

                        <span class="rating-score">

                            {{ movie.imdbRating }}

                        </span>

                    </div>

                </div>

                <div class="genres">

                    <Tag
                        v-for="genre in movie.Genre.split(', ')"
                        :key="genre"
                        :value="genre"
                        severity="danger"
                    />

                </div>

                <div class="info-grid">

                    <div>

                        <span>Director</span>

                        <strong>{{ movie.Director }}</strong>

                    </div>

                    <div>

                        <span>Actors</span>

                        <strong>{{ movie.Actors }}</strong>

                    </div>

                    <div>

                        <span>Released</span>

                        <strong>{{ movie.Released }}</strong>

                    </div>

                    <div>

                        <span>Language</span>

                        <strong>{{ movie.Language }}</strong>

                    </div>

                    <div>

                        <span>Runtime</span>

                        <strong>{{ movie.Runtime }}</strong>

                    </div>

                    <div>

                        <span>Awards</span>

                        <strong>{{ movie.Awards }}</strong>

                    </div>

                </div>

                <div class="plot">

                    <h3>

                        Story

                    </h3>

                    <p>

                        {{ movie.Plot }}

                    </p>

                </div>

                <Button
                    :label="favorite ? 'Remove from My Collection' : 'Save to My Collection'"
                    :icon="favorite ? 'pi pi-heart-fill' : 'pi pi-heart'"
                    class="favorite-button"
                    @click="toggleFavorite"
                />

            </div>

        </div>

    </div>

</div>

</template>

<style scoped>

.detail-page{

    max-width:1400px;

    margin:auto;

    padding:40px 20px 80px;

}

/* ========================= */
/* BACKGROUND */
/* ========================= */

.movie-background{

    position:relative;

    overflow:hidden;

    border-radius:30px;

}

.movie-background::before{

    content:"";

    position:absolute;

    inset:0;

    background-image:inherit;

    background-size:cover;

    background-position:center;

    filter:blur(45px);

    transform:scale(1.15);

    opacity:.22;

}

.background-overlay{

    position:absolute;

    inset:0;

    background:linear-gradient(
        rgba(8,8,8,.88),
        rgba(15,15,15,.95)
    );

}

/* ========================= */
/* MAIN CARD */
/* ========================= */

.movie-wrapper{

    position:relative;

    z-index:2;

    display:grid;

    grid-template-columns:380px 1fr;

    gap:60px;

    padding:40px;

    background:rgba(20,20,20,.78);

    backdrop-filter:blur(15px);

    border:1px solid rgba(255,255,255,.05);

    border-radius:30px;

    box-shadow:
        0 35px 80px rgba(0,0,0,.55),
        0 0 80px rgba(229,9,20,.08);

}

/* ========================= */
/* POSTER */
/* ========================= */

.poster-section{

    display:flex;

    justify-content:center;

}

.poster-section img{

    width:100%;

    border-radius:22px;

    box-shadow:0 30px 60px rgba(0,0,0,.55);

    transition:.45s;

}

.poster-section img:hover{

    transform:scale(1.05) rotate(-1deg);

    box-shadow:
        0 40px 80px rgba(0,0,0,.6),
        0 0 45px rgba(229,9,20,.2);

}

/* ========================= */
/* INFO */
/* ========================= */

.info-section{

    display:flex;

    flex-direction:column;

    gap:28px;

}

.top{

    display:flex;

    justify-content:space-between;

    align-items:flex-start;

    gap:30px;

}

.top h1{

    font-size:60px;

    font-weight:900;

    line-height:1;

    color:white;

    margin-bottom:10px;

}

.subtitle{

    color:#9ca3af;

    font-size:18px;

}

/* ========================= */
/* RATING */
/* ========================= */

.rating{

    display:flex;

    align-items:center;

    gap:14px;

    background:#f5c518;

    color:black;

    padding:14px 24px;

    border-radius:18px;

    font-weight:bold;

    box-shadow:0 12px 30px rgba(245,197,24,.3);

}

.rating-label{

    text-transform:uppercase;

    letter-spacing:1px;

    font-size:14px;

}

.rating-score{

    font-size:32px;

}

/* ========================= */
/* GENRES */
/* ========================= */

.genres{

    display:flex;

    flex-wrap:wrap;

    gap:12px;

}

:deep(.p-tag){

    background:#E50914 !important;

    color:white !important;

    border:none !important;

    border-radius:999px;

    padding:8px 14px;

    font-weight:700;

}

/* ========================= */
/* INFO GRID */
/* ========================= */

.info-grid{

    display:grid;

    grid-template-columns:repeat(2,1fr);

    gap:20px;

}

.info-grid div{

    background:#202020;

    padding:20px;

    border-radius:18px;

    transition:.3s;

}

.info-grid div:hover{

    background:#262626;

    transform:translateY(-3px);

}

.info-grid span{

    display:block;

    color:#8b8b8b;

    font-size:13px;

    text-transform:uppercase;

    letter-spacing:1px;

    margin-bottom:8px;

}

.info-grid strong{

    color:white;

    line-height:1.6;

}

/* ========================= */
/* PLOT */
/* ========================= */

.plot{

    background:#202020;

    border-radius:20px;

    padding:24px;

}

.plot h3{

    color:white;

    font-size:24px;

    margin-bottom:15px;

}

.plot p{

    color:#d4d4d4;

    line-height:1.9;

    font-size:17px;

}

/* ========================= */
/* BUTTONS */
/* ========================= */

:deep(.back-button){

    margin-bottom:35px;

    background:#242424 !important;

    color:white !important;

    border:none !important;

    border-radius:14px;

    transition:.3s;

}

:deep(.back-button:hover){

    background:#363636 !important;

    transform:translateY(-3px);

}

:deep(.favorite-button){

    width:100%;

    height:60px;

    background:#E50914 !important;

    border:none !important;

    color:white !important;

    border-radius:18px;

    font-size:18px;

    font-weight:700;

    transition:.3s;

}

:deep(.favorite-button:hover){

    background:#ff2733 !important;

    transform:translateY(-4px);

    box-shadow:0 15px 40px rgba(229,9,20,.45);

}

/* ========================= */
/* LOADING */
/* ========================= */

.loading{

    display:flex;

    justify-content:center;

    padding:120px;

}

/* ========================= */
/* ERROR */
/* ========================= */

.error-card{

    max-width:500px;

    margin:80px auto;

    background:#181818;

    border-radius:24px;

    padding:45px;

    text-align:center;

}

.error-card i{

    color:#E50914;

    font-size:60px;

    margin-bottom:20px;

}

.error-card h2{

    color:white;

    margin-bottom:10px;

}

.error-card p{

    color:#b3b3b3;

}

/* ========================= */
/* MOBILE */
/* ========================= */

@media(max-width:1100px){

.movie-wrapper{

    grid-template-columns:1fr;

}

.poster-section img{

    max-width:350px;

}

.top{

    flex-direction:column;

}

.info-grid{

    grid-template-columns:1fr;

}

.top h1{

    font-size:42px;

}

.rating-score{

    font-size:26px;

}

}

@media(max-width:700px){

.detail-page{

    padding:20px;

}

.movie-wrapper{

    padding:20px;

    gap:30px;

}

.top h1{

    font-size:34px;

}

.plot p{

    font-size:16px;

}

}

</style>