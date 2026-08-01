<template>
  <div class="home">

    <Card class="login-card">

      <template #title>
        🎬 MovieBase
      </template>

      <template #subtitle>
        Discover and save your favourite movies.
      </template>

      <!-- Show the login form if the user isn't logged in -->
      <div v-if="!authStore.isLoggedIn">

        <Form
          :validation-schema="schema"
          @submit="onSubmit"
        >

          <div class="field">

            <label for="username">Username</label>

            <Field
              name="username"
              v-slot="{ field }"
            >
              <InputText
                v-bind="field"
                id="username"
                placeholder="Enter your username"
              />
            </Field>

            <ErrorMessage
              name="username"
              class="error"
            />

          </div>

          <div class="field">

            <label for="password">Password</label>

            <Field
              name="password"
              v-slot="{ field }"
            >
              <Password
                v-bind="field"
                id="password"
                :feedback="false"
                toggleMask
                placeholder="Enter your password"
              />
            </Field>

            <ErrorMessage
              name="password"
              class="error"
            />

          </div>

          <Button
            type="submit"
            label="Login"
            icon="pi pi-sign-in"
            class="login-button"
          />

        </Form>

      </div>

      <!-- If the user is already logged in -->
      <div v-else>

        <h2>Welcome back, {{ authStore.username }} 👋</h2>

        <p>
          You're already logged in.
        </p>

        <RouterLink to="/search">

          <Button
            label="Go to Search"
            icon="pi pi-search"
          />

        </RouterLink>

      </div>

    </Card>

  </div>
</template>

<script setup>

// Vue Router
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'

// Pinia store
import { useAuthStore } from '../stores/authStore'

// PrimeVue components
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

// VeeValidate
import { Form, Field, ErrorMessage } from 'vee-validate'

// Yup validation
import * as yup from 'yup'

// Router instance
const router = useRouter()

// Authentication store
const authStore = useAuthStore()

// Validation rules
const schema = yup.object({

  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must contain at least 3 characters'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must contain at least 6 characters')

})

// Called when the form is valid
function onSubmit(values) {

  // Save the username in Pinia
  authStore.login(values.username)

  // Go to the Search page
  router.push('/search')

}

</script>

<style scoped>

.home{
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:85vh;
    padding:30px;
}

.login-card{
    width:420px;
    padding:20px;
}

.field{
    display:flex;
    flex-direction:column;
    margin-bottom:20px;
}

label{
    margin-bottom:8px;
    font-weight:600;
}

.error{
    color:#ff4d4f;
    font-size:14px;
    margin-top:5px;
}

.login-button{
    width:100%;
}

h2{
    margin-bottom:10px;
}

p{
    margin-bottom:20px;
}

</style>