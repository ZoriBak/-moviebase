# MovieBase

MovieBase is a Vue 3 movie discovery application that allows users to search for movies, view detailed information, and save movies to their favourites.

The project uses the OMDb API and combines Vue Router, Pinia, VeeValidate, PrimeVue, GSAP, and SCSS.

---

## Features

- User login with validation using VeeValidate
- Protected favourites page using Vue Router navigation guards
- Search for movies using the OMDb API
- View detailed movie information
- Add and remove movies from favourites
- State management with Pinia
- Loading and error states
- CSS and GSAP animations
- Responsive design
- PrimeVue components

---

## Technologies

- Vue 3
- Vue Router
- Pinia
- VeeValidate
- PrimeVue
- GSAP
- SCSS
- OMDb API
- Vite

---

## Project Structure

```text
src/
├── assets/
├── components/
│   └── MovieCard.vue
├── router/
│   └── index.js
├── stores/
│   ├── authStore.js
│   └── favoritesStore.js
├── styles/
│   ├── animations.scss
│   ├── main.scss
│   └── variables.scss
├── views/
│   ├── FavoritesView.vue
│   ├── HomeView.vue
│   ├── MovieDetail.vue
│   └── SearchView.vue
├── App.vue
└── main.js
```

---

## OMDb API Setup

MovieBase uses the OMDb API to search for movies and retrieve movie details.

Request a free API key from:

https://www.omdbapi.com/apikey.aspx

Add your API key to the files that use the OMDb API:

- `src/views/SearchView.vue`
- `src/views/MovieDetail.vue`

Example:

```js
const API_KEY = 'efb26b8d'
```

---

## How to Run Locally

Clone the repository:

```bash
git clone https://github.com/ZoriBak/-moviebase.git
```

Navigate to the project:

```bash
cd -moviebase
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local URL shown in your terminal, usually:

```text
http://localhost:5173
```

---

## Routes

| Route | Description |
|---|---|
| `/` | Home and login page |
| `/search` | Search for movies |
| `/movie/:id` | Movie details |
| `/favorites` | Saved favourite movies |

The favourites route is protected, so users must be logged in to access it.

---