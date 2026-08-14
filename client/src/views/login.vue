<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
    <div class="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-blue-900/10 p-8 md:p-10 border border-gray-100">

      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-[#004182] rounded-2xl mb-4 shadow-lg shadow-blue-700/30">
          <i class="fa-solid fa-bolt-lightning text-white text-3xl"></i>
        </div>
        <h2 class="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
        <p class="text-gray-500 mt-2 font-medium">Please enter your details to login</p>
      </div>

      <div
        v-if="errorMessage"
        class="mb-6 flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm animate-shake"
      >
        <i class="fa-solid fa-circle-exclamation"></i>
        <p class="font-semibold">{{ errorMessage }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">

        <div class="space-y-1">
          <label for="email" class="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
          <div class="relative group">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-[#004182] transition-colors">
              <i class="fa-solid fa-envelope"></i>
            </span>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="name@company.com"
              required
              class="custom-login-input pl-11"
            />
          </div>
        </div>

        <div class="space-y-1">
          <div class="flex justify-between items-center ml-1">
            <label for="password" class="text-xs font-bold text-gray-500 uppercase">Password</label>
            <a href="#" class="text-xs font-bold text-[#004182] hover:underline">Forgot?</a>
          </div>
          <div class="relative group">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-[#004182] transition-colors">
              <i class="fa-solid fa-lock"></i>
            </span>
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="••••••••"
              required
              class="custom-login-input pl-11"
            />
          </div>
        </div>

        <div class="pt-2">
          <button
            type="submit"
            class="w-full bg-[#004182] hover:bg-[#003366] text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Sign In to Account</span>
            <i class="fa-solid fa-arrow-right text-sm"></i>
          </button>
        </div>
      </form>

      <p class="mt-8 text-center text-gray-500 text-sm font-medium">
        Don't have an account?
        <router-link to="/register" class="text-[#004182] font-black hover:underline ml-1">
          Create one now
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from "../store/auth";
const authStore = useAuthStore();


const email = ref('')
const password = ref('')
const router = useRouter()
const errorMessage = ref('')

const handleSubmit = async () => {
  try {
    errorMessage.value = ''
    const res = await axios.post('http://localhost:3000/login', {
      email: email.value,
      password: password.value
    }, {
      withCredentials: true,
    })

    if (res.data.token) {
      authStore.setAuth(res.data.token, res.data.data.user) // use the store, not localStorage directly
      router.push('/')
    }
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Login failed. Incorrect email or password.'
  }
}
</script>

<style scoped>
.custom-login-input {
  width: 100%;
  padding-top: 0.875rem;
  padding-bottom: 0.875rem;
  padding-right: 1rem;
  border: 2px solid #f3f4f6;
  border-radius: 1rem;
  background-color: #f9fafb;
  font-size: 0.95rem;
  font-weight: 500;
  color: #111827;
  transition: all 0.2s ease-in-out;
}

.custom-login-input:focus {
  outline: none;
  border-color: #004182;
  background-color: white;
  box-shadow: 0 0 0 4px rgba(0, 65, 130, 0.1);
}

.animate-shake {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style>
