<script setup>
// Vue
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Pinia
import { useAuthStore } from '../stores/authStore'

// GSAP
import { gsap } from 'gsap'

// VeeValidate
import { Form, Field, ErrorMessage } from 'vee-validate'

// PrimeVue
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

// Router
const router = useRouter()

// Auth store
const authStore = useAuthStore()

// Validation rules
function validateUsername(value) {

    if (!value || !value.trim()) {
        return 'Username is required.'
    }

    if (value.trim().length < 3) {
        return 'Username must be at least 3 characters.'
    }

    return true
}

function validatePassword(value) {

    if (!value) {
        return 'Password is required.'
    }

    if (value.length < 6) {
        return 'Password must be at least 6 characters.'
    }

    return true
}

// Login
function login(values) {

    authStore.login(values.username.trim())

    router.push('/search')

}

// Search button after login
function goToSearch() {

    router.push('/search')

}

// Animation
onMounted(() => {

    gsap.from('.hero', {

        opacity: 0,
        x: -60,
        duration: 1,
        ease: 'power3.out'

    })

    gsap.from('.login-box', {

        opacity: 0,
        x: 60,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'

    })

})
</script>

<template>

<div class="home">

    <div class="background"></div>

    <!-- HERO -->

    <section class="hero">

        <div class="tag">

            <i class="pi pi-video"></i>

            <span>MOVIEBASE ORIGINALS</span>

        </div>

        <h1>

            Discover

            <span>your next</span>

            favourite movie.

        </h1>

        <p>

            Search thousands of movies,
            build your own collection,
            and save your favourites.

        </p>

    </section>

    <!-- LOGIN -->

    <div class="login-box">

        <template v-if="!authStore.isLoggedIn">

            <h2>

                Welcome Back

            </h2>

            <p class="subtitle">

                Sign in to continue your movie journey.

            </p>

            <Form
                @submit="login"
                class="login-form"
            >

                <!-- USERNAME -->

                <div class="field">

                    <label for="username">

                        Username

                    </label>

                    <Field
                        name="username"
                        :rules="validateUsername"
                        v-slot="{ field, meta }"
                    >

                        <InputText
                            id="username"
                            v-bind="field"
                            placeholder="Enter username"
                            :class="{
                                'input-error': meta.touched && !meta.valid
                            }"
                        />

                    </Field>

                    <ErrorMessage
                        name="username"
                        class="error-message"
                    />

                </div>

                <!-- PASSWORD -->

                <div class="field">

                    <label for="password">

                        Password

                    </label>

                    <Field
                        name="password"
                        :rules="validatePassword"
                        v-slot="{ field, meta }"
                    >

                        <Password
                            id="password"
                            v-bind="field"
                            :feedback="false"
                            toggleMask
                            placeholder="Enter password"
                            :class="{
                                'input-error': meta.touched && !meta.valid
                            }"
                        />

                    </Field>

                    <ErrorMessage
                        name="password"
                        class="error-message"
                    />

                </div>

                <!-- LOGIN -->

                <Button

                    type="submit"

                    label="Continue"

                    icon="pi pi-arrow-right"

                    class="login-btn"

                />

            </Form>

        </template>

        <!-- LOGGED IN -->

        <div
            v-else
            class="welcome"
        >

            <div class="welcome-icon">

                🎬

            </div>

            <h2>

                Welcome back,

                {{ authStore.username }}

            </h2>

            <p>

                Ready to discover your next favourite movie?

            </p>

            <Button

                label="Search Movies"

                icon="pi pi-search"

                class="search-movies-button"

                @click="goToSearch"

            />

        </div>

    </div>

</div>

</template>

<style scoped>

.home{

    min-height:90vh;

    display:grid;

    grid-template-columns:1fr 500px;

    align-items:center;

    gap:80px;

    position:relative;

}

.background{

    position:absolute;

    inset:0;

    background:
        radial-gradient(
            circle at top left,
            #E5091440,
            transparent 30%
        ),
        radial-gradient(
            circle at bottom right,
            #E5091420,
            transparent 35%
        );

    z-index:-1;

}

/* HERO */

.hero h1{

    font-size:72px;

    line-height:1;

    font-weight:900;

    color:white;

    margin:20px 0;

}

.hero h1 span{

    color:#E50914;

}

.hero p{

    color:#b5b5b5;

    font-size:20px;

    line-height:1.8;

    max-width:520px;

}

.tag{

    display:flex;

    align-items:center;

    gap:12px;

    color:white;

    margin-bottom:20px;

    font-size:15px;

    font-weight:700;

    letter-spacing:3px;

    text-transform:uppercase;

}

.tag i{

    color:#E50914;

    font-size:22px;

}

/* LOGIN */

.login-box{

    background:rgba(24,24,28,.96);

    backdrop-filter:blur(18px);

    border:1px solid rgba(255,255,255,.08);

    border-radius:28px;

    padding:45px;

    box-shadow:
        0 0 120px rgba(229,9,20,.08),
        0 30px 60px rgba(0,0,0,.55);

}

.login-box h2{

    color:white;

    margin-bottom:8px;

}

.subtitle{

    color:#b3b3b3;

    margin-bottom:30px;

}

.login-form{

    display:flex;

    flex-direction:column;

    gap:20px;

}

.field{

    display:flex;

    flex-direction:column;

    gap:8px;

}

label{

    color:white;

    font-weight:600;

}

.error-message{

    color:#ff6b6b;

    font-size:13px;

    min-height:18px;

}

.input-error{

    border-color:#E50914 !important;

}

.login-btn{

    margin-top:15px;

    width:100%;

    height:58px;

    font-size:18px;

    font-weight:700;

    border-radius:14px;

    background:#E50914 !important;

    border:none !important;

    color:white !important;

    transition:.3s;

}

.login-btn:hover{

    background:#ff2733 !important;

    transform:translateY(-5px);

    box-shadow:0 15px 35px rgba(229,9,20,.45);

}

/* WELCOME */

.welcome{

    display:flex;

    flex-direction:column;

    gap:18px;

    align-items:center;

    text-align:center;

}

.welcome-icon{

    width:70px;

    height:70px;

    display:flex;

    align-items:center;

    justify-content:center;

    background:#E50914;

    border-radius:20px;

    font-size:32px;

    box-shadow:0 15px 35px rgba(229,9,20,.3);

}

.welcome h2{

    color:white;

    margin:0;

}

.welcome p{

    color:#b3b3b3;

}

.search-movies-button{

    width:100%;

}

:deep(.search-movies-button.p-button){

    background:#E50914 !important;

    border:1px solid #E50914 !important;

    color:white !important;

    border-radius:16px;

    height:58px;

    font-size:17px;

    font-weight:700;

    transition:.3s;

}

:deep(.search-movies-button.p-button:hover){

    background:#ff2733 !important;

    border-color:#ff2733 !important;

    transform:translateY(-4px);

    box-shadow:0 12px 35px rgba(229,9,20,.45);

}

:deep(.p-inputtext),
:deep(.p-password){

    width:100%;

}

:deep(.p-password-input){

    width:100%;

}

/* MOBILE */

@media(max-width:1000px){

    .home{

        grid-template-columns:1fr;

        text-align:center;

    }

    .hero{

        margin-top:40px;

    }

    .hero h1{

        font-size:48px;

    }

    .hero p{

        margin:auto;

    }

    .login-box{

        max-width:500px;

        width:100%;

        margin:auto;

    }

}

</style>