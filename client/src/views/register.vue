<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
    <div
      class="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-blue-900/10 p-8 md:p-10 border border-gray-100"
    >
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-[#004182] rounded-2xl mb-4 shadow-lg shadow-blue-700/30"
        >
          <i class="fa-solid fa-user-plus text-white text-3xl"></i>
        </div>

        <h2 class="text-3xl font-black text-gray-900">
          Create Account
        </h2>

        <p class="text-gray-500 mt-2">
          Join the Pimpchat community today
        </p>
      </div>

      <transition name="fade">
        <div
          v-if="errorMessage"
          class="mb-6 flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl"
        >
          <i class="fa-solid fa-circle-exclamation"></i>
          <p>{{ errorMessage }}</p>
        </div>
      </transition>

      <form @submit.prevent="handleSubmit" class="space-y-4">

        <!-- First + Last Name -->
        <div class="grid grid-cols-2 gap-4">

          <div class="space-y-1">
            <label class="text-xs font-bold text-gray-500 uppercase ml-1">
              First Name
            </label>

            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <i class="fa-solid fa-user"></i>
              </span>

              <input
                v-model="firstName"
                type="text"
                required
                placeholder="John"
                class="custom-auth-input pl-11"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-xs font-bold text-gray-500 uppercase ml-1">
              Last Name
            </label>

            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                <i class="fa-solid fa-user"></i>
              </span>

              <input
                v-model="lastName"
                type="text"
                required
                placeholder="Doe"
                class="custom-auth-input pl-11"
              />
            </div>
          </div>

        </div>

        <!-- Username -->

        <div class="space-y-1">
          <label class="text-xs font-bold text-gray-500 uppercase ml-1">
            Username
          </label>

          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
              <i class="fa-solid fa-at"></i>
            </span>

            <input
              v-model="username"
              type="text"
              required
              placeholder="johndoe"
              class="custom-auth-input pl-11"
            />
          </div>
        </div>

        <!-- Email -->

        <div class="space-y-1">
          <label class="text-xs font-bold text-gray-500 uppercase ml-1">
            Email
          </label>

          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
              <i class="fa-solid fa-envelope"></i>
            </span>

            <input
              v-model="email"
              type="email"
              required
              placeholder="john@example.com"
              class="custom-auth-input pl-11"
            />
          </div>
        </div>

        <!-- Password -->

        <div class="space-y-1">
          <label class="text-xs font-bold text-gray-500 uppercase ml-1">
            Password
          </label>

          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
              <i class="fa-solid fa-lock"></i>
            </span>

            <input
              v-model="password"
              type="password"
              required
              placeholder="********"
              class="custom-auth-input pl-11"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-[#004182] hover:bg-[#003366] text-white py-4 rounded-2xl font-bold transition"
        >
          Create Account
        </button>

      </form>

      <p class="mt-8 text-center text-gray-500">
        Already have an account?

        <router-link
          to="/login"
          class="text-[#004182] font-bold"
        >
          Sign In
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "../store/auth";

const router = useRouter();
const authStore = useAuthStore();

const firstName = ref("");
const lastName = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const handleSubmit = async () => {
  try {
    errorMessage.value = "";

    const response = await axios.post(
      "http://localhost:3000/register",
      {
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        email: email.value,
        password: password.value,
      }
    );

    if (response.data.token) {
      authStore.setAuth(response.data.token, response.data.user);
      router.push("/");
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Registration failed.";
  }
};
</script>

<style scoped>
.custom-auth-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #f3f4f6;
  border-radius: 1rem;
  background: #f9fafb;
  transition: .2s;
}

.custom-auth-input:focus {
  outline: none;
  border-color: #004182;
  background: white;
  box-shadow: 0 0 0 4px rgba(0,65,130,.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
