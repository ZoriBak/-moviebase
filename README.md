# 🎬 MovieBase

MovieBase is a Vue 3 movie discovery application built as part of a web development assignment.

The application allows users to search for movies using the OMDb API, view detailed movie information, and create a personal collection of favourite movies.

## ✨ Features

- 🔐 Login with form validation
- 🔎 Search movies using the OMDb API
- 🎬 Movie detail pages
- ⭐ IMDb ratings
- ❤️ Add and remove favourite movies
- 📚 Personal movie collection
- 🔒 Protected Favorites route
- 🎨 Netflix-inspired responsive interface
- ✨ CSS hover animations
- ✨ Vue transitions
- 🎞️ GSAP movie detail animation
- 📱 Responsive design
- 🧭 Vue Router navigation
- 🗃️ Pinia state management
- 🎨 PrimeVue components

## 🛠️ Technologies

- Vue 3
- Vue Router
- Pinia
- PrimeVue
- VeeValidate
- GSAP
- SCSS
- OMDb API

## 📁 Project Structure

```text
src/
├── main.js
├── App.vue
├── router/
│   └── index.js
├── stores/
│   ├── authStore.js
│   └── favoritesStore.js
├── views/
│   ├── HomeView.vue
│   ├── SearchView.vue
│   ├── MovieDetail.vue
│   └── FavoritesView.vue
├── components/
│   └── MovieCard.vue
└── styles/
    └── main.scss
```

## 🔑 OMDb API Key

MovieBase uses the free OMDb API.

Request an API key from:

https://www.omdbapi.com/apikey.aspx

After receiving the key, add it to the API requests in:

```text
src/views/SearchView.vue
src/views/MovieDetail.vue
```

Replace the existing API key with your own key.

## 🚀 Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Enter the project folder:

```bash
cd MovieBase
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will then be available at the local URL shown in the terminal.

## 🔐 Login

The login form requires:

- Username: minimum 3 characters
- Password: minimum 6 characters

The password is only validated on the client side as required by the assignment. No real account or password verification is performed.

## ❤️ Favorites

Users can add movies to their personal collection from the movie detail page.

The Favorites page is protected and can only be accessed after logging in.

Logging out resets the authentication state.

## 🎨 Design

The interface uses a dark, Netflix-inspired visual style with:

- Dark backgrounds
- Netflix red accents
- Movie poster cards
- Hover animations
- GSAP animations
- Responsive layouts

## 👨‍🎓 Author

**Zori Bak**

International Digital Experience Design  
Thomas More University

## 📚 Assignment

MovieBase was created to demonstrate the use of Vue 3, Vue Router, Pinia, PrimeVue, VeeValidate, animations, API integration, and reusable components in a single application.
