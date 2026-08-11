<script setup>
// Vue Router
import { useRouter } from 'vue-router'

// Receive movie from parent
const props = defineProps({
    movie: {
        type: Object,
        required: true
    }
})

// Router
const router = useRouter()

// Open detail page
function openMovie() {
    router.push(`/movie/${props.movie.imdbID}`)
}
</script>

<template>

<div
    class="movie-card"
    @click="openMovie"
>

    <img
        :src="movie.Poster !== 'N/A'
            ? movie.Poster
            : 'https://placehold.co/500x750?text=No+Poster'"
        :alt="movie.Title"
    >

    <div class="overlay">

        <div class="top">

            <span class="year">

                {{ movie.Year }}

            </span>

        </div>

        <div class="bottom">

            <h2>

                {{ movie.Title }}

            </h2>

            <button>

                <i class="pi pi-play"></i>

                View Details

            </button>

        </div>

    </div>

</div>

</template>

<style scoped>

.movie-card{

    position:relative;

    overflow:hidden;

    border-radius:20px;

    cursor:pointer;

    background:#181818;

    box-shadow:0 12px 30px rgba(0,0,0,.35);

    transition:all .35s ease;

    aspect-ratio:2 / 3;

}

.movie-card:hover{

    transform:translateY(-10px);

    box-shadow:0 25px 50px rgba(0,0,0,.55);

}

.movie-card img{

    width:100%;

    height:100%;

    object-fit:cover;

    transition:transform .45s ease;

}

.movie-card:hover img{

    transform:scale(1.08);

}

/* Overlay */

.overlay{

    position:absolute;

    inset:0;

    display:flex;

    flex-direction:column;

    justify-content:space-between;

    padding:18px;

    background:linear-gradient(

        rgba(0,0,0,.05),

        rgba(0,0,0,.15),

        rgba(0,0,0,.95)

    );

    opacity:0;

    transition:.35s;

}

.movie-card:hover .overlay{

    opacity:1;

}

/* Top */

.top{

    display:flex;

    justify-content:flex-end;

}

.year{

    background:#E50914;

    color:white;

    padding:8px 14px;

    border-radius:30px;

    font-size:13px;

    font-weight:bold;

}

/* Bottom */

.bottom{

    transform:translateY(35px);

    transition:.35s;

}

.movie-card:hover .bottom{

    transform:translateY(0);

}

.bottom h2{

    color:white;

    font-size:24px;

    line-height:1.2;

    margin-bottom:15px;

    display:-webkit-box;

    -webkit-line-clamp:2;

    -webkit-box-orient:vertical;

    overflow:hidden;

}

.bottom button{

    display:flex;

    align-items:center;

    gap:10px;

    padding:12px 18px;

    background:#E50914;

    color:white;

    border:none;

    border-radius:30px;

    font-weight:600;

    transition:.25s;

}

.bottom button:hover{

    background:#ff2733;

    transform:translateX(6px);

}

.bottom button i{

    font-size:14px;

}

@media(max-width:768px){

.bottom h2{

    font-size:18px;

}

.bottom button{

    width:100%;

    justify-content:center;

}

}

</style>