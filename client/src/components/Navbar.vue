<template>
  <nav class="sticky top-0 z-50 bg-[#004182] shadow-xl border-b border-white/10 px-4 py-3 md:px-8">
    <div class="max-w-7xl mx-auto flex justify-between items-center">

      <div class="flex items-center gap-2">
        <router-link to="/" class="text-2xl font-black tracking-tighter text-[#00bfff] flex items-center gap-2">

          <img width="70" src="/yamli.png" alt="Logo" />

        </router-link>
      </div>

      <ul class="hidden md:flex items-center gap-1">
        <template v-if="isAuthenticated">
          <li v-for="link in navLinks" :key="link.path">
            <router-link
              :to="link.path"
              class="nav-item flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:bg-white/10 hover:text-[#00bfff]"
              active-class="active-nav"
            >
              <i :class="link.icon"></i>
              {{ link.name }}
            </router-link>
          </li>

          <li class="ml-4 pl-4 border-l border-white/20">
            <router-link
              :to="`/profil/${userId}`"
              class="flex items-center gap-3 group"
            >
              <div class="relative">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/3840px-User-avatar.svg.png"
                  class="w-10 h-10 rounded-full border-2 bg-white border-[#ffffff] object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div class="hidden lg:block text-left">
                <p class="text-xs font-bold leading-none text-white">{{ user?.username || 'user' }}</p>

              </div>
            </router-link>
          </li>

          <li>
            <button @click="logout" class="ml-2 p-2 text-white/70 hover:text-red-400 transition-colors">
              Logout
            </button>
          </li>
        </template>

        <template v-else>
          <li><router-link to="/login" class="text-white hover:text-[#00bfff] px-4 font-bold">Login</router-link></li>
          <li>
            <router-link to="/register" class="bg-[#00bfff] text-[#004182] px-6 py-2 rounded-xl font-black shadow-lg hover:bg-white transition-all">
                Register
            </router-link>
          </li>
        </template>
      </ul>

      <button class="md:hidden flex flex-col gap-1.5 z-50 p-2" @click="toggleMenu">
        <div class="w-6 h-0.5 bg-white transition-all duration-300" :class="{'rotate-45 translate-y-2': menuOpen}"></div>
        <div class="w-6 h-0.5 bg-white transition-all duration-300" :class="{'opacity-0': menuOpen}"></div>
        <div class="w-6 h-0.5 bg-white transition-all duration-300" :class="{'-rotate-45 -translate-y-2': menuOpen}"></div>
      </button>

      <transition name="slide">
        <div v-if="menuOpen" class="fixed inset-0 bg-[#004182] z-40 md:hidden flex flex-col p-8 pt-24">
          <ul class="flex flex-col gap-6 text-center text-xl font-bold">
            <template v-if="isAuthenticated">
              <li v-for="link in navLinks" :key="link.path" @click="menuOpen = false">
                <router-link :to="link.path" class="text-white flex items-center justify-center gap-3">
                  <i :class="link.icon" class="text-[#00bfff]"></i> {{ link.name }}
                </router-link>
              </li>
              <li @click="menuOpen = false">
                 <router-link :to="`/profil/${userId}`" class="flex items-center justify-center gap-3 text-[#00bfff]">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/3840px-User-avatar.svg.png" class="w-8 h-8 rounded-full border border-white" />
                   My Profile
                 </router-link>
              </li>
              <li><button @click="logout" class="text-red-400">Logout</button></li>
            </template>
            <template v-else>
              <li @click="menuOpen = false"><router-link to="/login">Login</router-link></li>
              <li @click="menuOpen = false"><router-link to="/register">Register</router-link></li>
            </template>
          </ul>
        </div>
      </transition>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const defaultProfile = "https://ui-avatars.com/api/?background=00bfff&color=004182&name=User";

const user = ref(JSON.parse(localStorage.getItem("user")) || {});
const profile = ref({});
const menuOpen = ref(false);

import { provide } from "vue";



provide("username", user.value?.username);



const navLinks = [
  { name: 'Home', path: '/', icon: 'fa-solid fa-house' },
  { name: 'Friends', path: '/friends', icon: 'fa-solid fa-user-group' },
  { name: 'Messages', path: '/chat', icon: 'fa-solid fa-comment-dots' },
  { name: 'Notifications', path: '/notifications', icon: 'fa-solid fa-bell' },
];

const toggleMenu = () => { menuOpen.value = !menuOpen.value; };
const userId = computed(() => user.value._id || user.value.id || "");
const isAuthenticated = computed(() => !!localStorage.getItem("token"));

const logout = () => {
  localStorage.clear();
  router.push("/login");
};

onMounted(async () => {
  if (!userId.value) return;
  try {
    const profileRes = await axios.get(`http://localhost:3000/profil/${userId.value}`);
    profile.value = profileRes.data || {};
  } catch (err) {
    console.error("Nav Load Error:", err);
  }
});
</script>

<style scoped>
.text-white { color: white; }

.nav-item {
  color: rgba(255, 255, 255, 0.8);
}

.active-nav {
  background: rgba(255, 255, 255, 0.15);
  color: #00bfff !important;
}

/* Slide Transition for Mobile */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from, .slide-leave-to {
  transform: translateY(-100%);
}

/* Fix for smooth scrolling/sticky */
nav {
  backdrop-filter: blur(10px);
}
</style>
