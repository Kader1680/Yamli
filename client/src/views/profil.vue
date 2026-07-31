<template>
  <div class="min-h-screen bg-gray-50 pb-12">
    <div class="bg-white shadow-sm">
      <div class="h-48 md:h-64 bg-gradient-to-r from-[#004182] to-blue-400 relative">
        <button class="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg backdrop-blur-md text-sm transition-all">
          <i class="fa-solid fa-camera mr-2">
          <input  type="file" accept="image/*" @change="handleCoverChange" />

          </i> Edit Cover

        </button>
      </div>

      <div class="max-w-6xl mx-auto px-4 pb-6">
        <div class="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-20 gap-6">
          <div class="relative group">

            <!-- <img
              :src="profile.profilePicture || defaultProfile"
              class="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-white shadow-lg object-cover bg-white"
              alt="Profile"
            /> -->

                      <img
            :src="profile.avatar
              ? `http://localhost:3000${profile.avatar}`
              : defaultProfile"
            class="w-32 h-32 md:w-44 md:h-44 rounded-full"
          />



            <label class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
              <i class="fa-solid fa-camera text-white text-2xl"></i>
              <input type="file" accept="image/png,image/jpeg,image/webp" />

              <!-- <input type="file" accept="image/*" @change="handleAvatarChange" class="hidden" /> -->
            </label>
          </div>

          <div class="flex-1 text-center md:text-left mb-2">
            <h1 class="text-3xl font-extrabold text-gray-900">
              {{ profile.first_name || "New" }} {{ profile.last_name || "User" }}
            </h1>
            <p class="text-gray-500 font-medium">{{ profile.bio || "No bio yet..." }}</p>
          </div>

          <div class="flex gap-3 mb-2">
            <button @click="showEditModal = true" class="bg-[#004182] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:bg-[#003366] transition-all">
              <i class="fa-solid fa-pen-to-square mr-2"></i> Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

      <aside class="space-y-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Intro</h3>
          <ul class="space-y-4">
            <li v-if="profile.workplace" class="flex items-center gap-3 text-gray-600">
              <i class="fa-solid fa-briefcase w-5 text-gray-400"></i>
              <span>Works at <span class="font-bold text-gray-800">{{ profile.workplace }}</span></span>
            </li>
            <li v-if="profile.education" class="flex items-center gap-3 text-gray-600">
              <i class="fa-solid fa-graduation-cap w-5 text-gray-400"></i>
              <span>Studied at <span class="font-bold text-gray-800">{{ profile.education }}</span></span>
            </li>
            <li v-if="profile.address" class="flex items-center gap-3 text-gray-600">
              <i class="fa-solid fa-location-dot w-5 text-gray-400"></i>
              <span>Lives in <span class="font-bold text-gray-800">{{ profile.address }}</span></span>
            </li>
            <li v-if="profile.home" class="flex items-center gap-3 text-gray-600">
              <i class="fa-solid fa-house w-5 text-gray-400"></i>
              <span>From <span class="font-bold text-gray-800">{{ profile.home }}</span></span>
            </li>
            <li v-if="profile.phone" class="flex items-center gap-3 text-gray-600">
              <i class="fa-solid fa-phone w-5 text-gray-400"></i>
              <span>{{ profile.phone }}</span>
            </li>
          </ul>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-gray-900">Friends</h3>
            <button class="text-[#004182] text-sm font-semibold">See all</button>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <div v-for="friend in friends.slice(0, 6)" :key="friend.id" class="text-center">
              <img :src="friend.profilePicture || defaultProfile" class="w-full aspect-square object-cover rounded-lg border border-gray-100" />
              <p class="text-[10px] mt-1 font-medium truncate">{{ friend.name }}</p>
            </div>
          </div>
        </div>
      </aside>

      <main class="lg:col-span-2 space-y-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">Timeline</h3>
            <div class="flex gap-2">
                <button class="p-2 hover:bg-gray-100 rounded-full text-gray-400"><i class="fa-solid fa-sliders"></i></button>
            </div>
          </div>

          <div v-if="posts.length === 0" class="text-center py-12">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <i class="fa-solid fa-pen-nib text-2xl"></i>
            </div>
            <p class="text-gray-400 font-medium">No posts to show yet</p>
          </div>

          <div v-else class="space-y-6">
            <div v-for="post in posts" :key="post.id" class="p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-hover hover:border-blue-100">
              <div class="flex items-center gap-3 mb-3">
                 <img :src="profile.profilePicture || defaultProfile" class="w-10 h-10 rounded-full" />
                 <div>
                    <p class="font-bold text-gray-900">{{ profile.first_name }} {{ profile.last_name }}</p>
                    <p class="text-[10px] text-gray-400">{{ formatDate(post.createdAt) }}</p>
                 </div>
              </div>
              <p class="text-gray-700 leading-relaxed">{{ post.content }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>

    <Transition name="fade">
      <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div class="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
            <h2 class="text-2xl font-bold text-gray-900">Edit Information</h2>
            <button @click="showEditModal = false" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">
              <i class="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <form @submit.prevent="saveProfile" class="p-8 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-xs font-bold text-gray-500 uppercase ml-1">First Name</label>
                <input v-model="profile.first_name" class="custom-input" placeholder="Enter first name" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold text-gray-500 uppercase ml-1">Last Name</label>
                <input v-model="profile.last_name" class="custom-input" placeholder="Enter last name" />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-xs font-bold text-gray-500 uppercase ml-1">About Me (Bio)</label>
              <textarea v-model="profile.bio" rows="3" class="custom-input resize-none" placeholder="Tell us about yourself..."></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-xs font-bold text-gray-500 uppercase ml-1">Current City</label>
                <input v-model="profile.address" class="custom-input" placeholder="City, Country" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold text-gray-500 uppercase ml-1">Hometown</label>
                <input v-model="profile.home" class="custom-input" placeholder="Where are you from?" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold text-gray-500 uppercase ml-1">Workplace</label>
                <input v-model="profile.workplace" class="custom-input" placeholder="Company name" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold text-gray-500 uppercase ml-1">Education</label>
                <input v-model="profile.education" class="custom-input" placeholder="University/School" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold text-gray-500 uppercase ml-1">Phone Number</label>
                <input v-model="profile.phone" class="custom-input" placeholder="+1 234..." />
              </div>
            </div>

            <div class="flex gap-3 pt-4">
              <button type="button" @click="showEditModal = false" class="flex-1 px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all">
                Cancel
              </button>
              <button type="submit" class="flex-1 bg-[#004182] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:bg-[#003366] transition-all">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const defaultProfile = "https://ui-avatars.com/api/?background=004182&color=fff&name=User";
const showEditModal = ref(false);

const user = ref(JSON.parse(localStorage.getItem("user")) || {});
const profile = ref({
  first_name: '',
  last_name: '',
  bio: '',
  address: '',
  phone: '',
  home: '',
  workplace: '',
  education: '',
});


const avatarFile = ref(null);
const coverFile = ref(null);

const posts = ref([]);
const friends = ref([
    { id: 1, name: 'Ahmed Ali' },
    { id: 2, name: 'Sara Smith' },
    { id: 3, name: 'John Doe' },
    { id: 4, name: 'Meissa Lane' }
]);

onMounted(async () => {
  if (!user.value.id) return;
  try {
    const res = await axios.get(`http://localhost:3000/profil/${user.value.id}`);
    if (res.data) profile.value = res.data;


  } catch (err) {
    console.error("Error loading profile:", err);
  }
});

// const handleImageUpload = async (event) => {
//   const file = event.target.files[0];
//   if (!file) return;
//   const formData = new FormData();
//   formData.append('image', file);

//   try {
//     const res = await axios.post(`http://localhost:3000/profil`, formData);
//     profile.value.profilePicture = res.data.profilePicture;
//   } catch (err) {
//     alert("Failed to upload image");
//   }
// };
const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  avatarFile.value = file;
  profile.value.avatar = URL.createObjectURL(file);
};

const handleCoverChange = (event) => {
  coverFile.value = event.target.files[0];
};


const saveProfile = async () => {
  try {
    const formData = new FormData();

    formData.append("id_user", user.value.id);
    formData.append("first_name", profile.value.first_name);
    formData.append("last_name", profile.value.last_name);
    formData.append("bio", profile.value.bio);
    formData.append("address", profile.value.address);
    formData.append("phone", profile.value.phone);
    formData.append("home", profile.value.home);
    formData.append("workplace", profile.value.workplace);
    formData.append("education", profile.value.education);

    if (avatarFile.value) {
      formData.append("avatar", avatarFile.value);
    }

    if (coverFile.value) {
      formData.append("cover_photo", coverFile.value);
    }

    await axios.post("http://localhost:3000/profil", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

     const res = await axios.get(`http://localhost:3000/profil/${user.value.id}`);
    profile.value = res.data;


    showEditModal.value = false;
    alert("Profile updated!");
  } catch (err) {
    console.error(err);
    alert("Failed to update profile");
  }
};


const formatDate = (date) => date ? new Date(date).toLocaleDateString() : 'Recently';
</script>

<style scoped>
.custom-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #f9fafb;
  transition: all 0.2s;
  font-size: 0.95rem;
}
.custom-input:focus {
  border-color: #004182;
  background: white;
  outline: none;
  box-shadow: 0 0 0 4px rgba(0, 65, 130, 0.1);
}

/* Modal Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
