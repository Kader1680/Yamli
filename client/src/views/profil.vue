<template>
  <div class="min-h-screen bg-gray-50 pb-12">
    <!-- Cover -->
    <div class="bg-white shadow-sm">
      <div
        class="h-48 md:h-64 relative bg-gradient-to-r from-[#004182] to-blue-400"
        :style="coverStyle"
      >
        <label
          class="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30
                 text-white px-3 py-1.5 rounded-lg backdrop-blur-md
                 text-sm transition-all cursor-pointer"
        >
          <i class="fa-solid fa-camera mr-2"></i>
          Edit Cover

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            class="hidden"
            @change="handleCoverChange"
          />
        </label>
      </div>

      <!-- Profile Header -->
      <div class="max-w-6xl mx-auto px-4 pb-6">
        <div
          class="flex flex-col md:flex-row items-center md:items-end
                 -mt-16 md:-mt-20 gap-6"
        >
          <!-- Avatar -->
          <div class="relative group">
            <img
              :src="profile.avatar || defaultProfile"
              class="w-32 h-32 md:w-44 md:h-44 rounded-full
                     border-4 border-white shadow-lg object-cover bg-white"
              alt="Profile"
            />

            <label
              class="absolute inset-0 flex items-center justify-center
                     bg-black/40 rounded-full opacity-0
                     group-hover:opacity-100 cursor-pointer
                     transition-opacity"
            >
              <i class="fa-solid fa-camera text-white text-2xl"></i>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                class="hidden"
                @change="handleAvatarChange"
              />
            </label>
          </div>

          <!-- User information -->
          <div class="flex-1 text-center md:text-left mb-2">
            <h1 class="text-3xl font-extrabold text-gray-900">
              {{ profile.firstName || "New" }}
              {{ profile.lastName || "User" }}
            </h1>

            <p
              v-if="profile.username"
              class="text-sm text-gray-400 mt-1"
            >
              @{{ profile.username }}
            </p>

            <p class="text-gray-500 font-medium mt-2">
              {{ profile.bio || "No bio yet..." }}
            </p>
          </div>

          <!-- Edit button -->
          <div class="flex gap-3 mb-2">


          <button
              class="bg-[#004182] text-white px-6 py-2.5
                     rounded-xl font-bold shadow-lg
                     shadow-blue-900/20 hover:bg-[#003366]
                     transition-all"
            >
              <i class="fa-solid fa-pen-to-square mr-2"></i>
              <a @click="openEditModal">Edit Profile</a>
            </button>

          <button
              @click="openEditModal"
              class="bg-[#d30e0e] text-white px-6 py-2.5
                     rounded-xl font-bold shadow-lg
                     shadow-blue-900/20 hover:bg-[#de2323]
                     transition-all"
            >
              <i class="fa-solid fa-trash mr-2"></i>
              Delete Account
            </button>



          </div>
        </div>
      </div>
    </div>

    <!-- Main -->
    <div
      class="max-w-6xl mx-auto px-4 mt-8
             grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <!-- Sidebar -->
      <aside class="space-y-6">
        <!-- Intro -->
        <div
          class="bg-white p-6 rounded-2xl shadow-sm
                 border border-gray-100"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            Intro
          </h3>

          <ul class="space-y-4">
            <li class="flex items-center gap-3 text-gray-600">
              <i
                class="fa-solid fa-user w-5 text-gray-400"
              ></i>

              <span>
                {{ profile.firstName || "New" }}
                {{ profile.lastName || "User" }}
              </span>
            </li>

            <li
              v-if="profile.email"
              class="flex items-center gap-3 text-gray-600"
            >
              <i
                class="fa-solid fa-envelope w-5 text-gray-400"
              ></i>

              <span>{{ profile.email }}</span>
            </li>

            <li
              v-if="profile.createdAt"
              class="flex items-center gap-3 text-gray-600"
            >
              <i
                class="fa-solid fa-calendar w-5 text-gray-400"
              ></i>

              <span>
                Joined {{ formatDate(profile.createdAt) }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Friends placeholder -->
        <div
          class="bg-white p-6 rounded-2xl shadow-sm
                 border border-gray-100"
        >
          <div
            class="flex justify-between items-center mb-4"
          >
            <h3 class="text-lg font-bold text-gray-900">
              Friends
            </h3>

            <button
              class="text-[#004182] text-sm font-semibold"
            >
              See all
            </button>
          </div>

          <div
            v-if="friends.length"
            class="grid grid-cols-3 gap-2"
          >
            <div
              v-for="friend in friends.slice(0, 6)"
              :key="friend.id"
              class="text-center"
            >
              <img
                :src="friend.avatar || defaultProfile"
                class="w-full aspect-square object-cover
                       rounded-lg border border-gray-100"
                :alt="friend.name"
              />

              <p
                class="text-[10px] mt-1 font-medium truncate"
              >
                {{ friend.name }}
              </p>
            </div>
          </div>

          <p
            v-else
            class="text-sm text-gray-400 text-center py-4"
          >
            No friends yet.
          </p>
        </div>
      </aside>

      <!-- Timeline -->
      <main class="lg:col-span-2 space-y-6">
        <div
          class="bg-white p-6 rounded-2xl shadow-sm
                 border border-gray-100"
        >
          <div
            class="flex items-center justify-between mb-6"
          >
            <h3 class="text-xl font-bold text-gray-900">
              Timeline
            </h3>

            <div class="flex gap-2">
              <button
                class="p-2 hover:bg-gray-100 rounded-full
                       text-gray-400"
              >
                <i class="fa-solid fa-sliders"></i>
              </button>
            </div>
          </div>

          <div
            v-if="posts.length === 0"
            class="text-center py-12"
          >
            <div
              class="w-16 h-16 bg-gray-100 rounded-full
                     flex items-center justify-center
                     mx-auto mb-4 text-gray-300"
            >
              <i class="fa-solid fa-pen-nib text-2xl"></i>
            </div>

            <p class="text-gray-400 font-medium">
              No posts to show yet
            </p>
          </div>

          <div
            v-else
            class="space-y-6"
          >
            <div
              v-for="post in posts"
              :key="post.id"
              class="p-5 rounded-2xl bg-gray-50
                     border border-gray-100
                     hover:border-blue-100 transition"
            >
              <div
                class="flex items-center gap-3 mb-3"
              >
                <img
                  :src="profile.avatar || defaultProfile"
                  class="w-10 h-10 rounded-full object-cover"
                  alt="Profile"
                />

                <div>
                  <p
                    class="font-bold text-gray-900"
                  >
                    {{ profile.firstName }}
                    {{ profile.lastName }}
                  </p>

                  <p
                    class="text-[10px] text-gray-400"
                  >
                    {{ formatDate(post.createdAt) }}
                  </p>
                </div>
              </div>

              <p
                class="text-gray-700 leading-relaxed"
              >
                {{ post.content }}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Edit Profile Modal -->
    <Transition name="fade">
      <div
        v-if="showEditModal"
        class="fixed inset-0 z-50
               flex items-center justify-center
               p-4 bg-black/60 backdrop-blur-sm"
      >
        <div
          class="bg-white rounded-3xl w-full max-w-2xl
                 max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <!-- Modal Header -->
          <div
            class="p-6 border-b border-gray-100
                   flex justify-between items-center
                   sticky top-0 bg-white z-10"
          >
            <h2
              class="text-2xl font-bold text-gray-900"
            >
              Edit Information
            </h2>

            <button
              @click="closeEditModal"
              class="w-10 h-10 flex items-center
                     justify-center rounded-full
                     hover:bg-gray-100 text-gray-400"
            >
              <i class="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <!-- Form -->
          <form
            @submit.prevent="saveProfile"
            class="p-8 space-y-6"
          >
            <!-- First / Last name -->
            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div class="space-y-1">
                <label
                  class="text-xs font-bold text-gray-500
                         uppercase ml-1"
                >
                  First Name
                </label>

                <input
                  v-model="editForm.firstName"
                  type="text"
                  class="custom-input"
                  placeholder="Enter first name"
                />
              </div>

              <div class="space-y-1">
                <label
                  class="text-xs font-bold text-gray-500
                         uppercase ml-1"
                >
                  Last Name
                </label>

                <input
                  v-model="editForm.lastName"
                  type="text"
                  class="custom-input"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <!-- Username -->
            <div class="space-y-1">
              <label
                class="text-xs font-bold text-gray-500
                       uppercase ml-1"
              >
                Username
              </label>

              <input
                v-model="editForm.username"
                type="text"
                class="custom-input"
                placeholder="username"
              />
            </div>

            <!-- Email -->
            <div class="space-y-1">
              <label
                class="text-xs font-bold text-gray-500
                       uppercase ml-1"
              >
                Email
              </label>

              <input
                :value="profile.email"
                type="email"
                class="custom-input bg-gray-100"
                disabled
              />

              <p class="text-xs text-gray-400 mt-1">
                Email cannot be changed from this page.
              </p>
            </div>

            <!-- Bio -->
            <div class="space-y-1">
              <label
                class="text-xs font-bold text-gray-500
                       uppercase ml-1"
              >
                About Me
              </label>

              <textarea
                v-model="editForm.bio"
                rows="4"
                class="custom-input resize-none"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>

            <!-- Buttons -->
            <div class="flex gap-3 pt-4">
              <button
                type="button"
                @click="closeEditModal"
                class="flex-1 px-6 py-3 rounded-xl
                       font-bold text-gray-500
                       hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>

              <button
                type="submit"
                :disabled="saving"
                class="flex-1 bg-[#004182] text-white
                       px-6 py-3 rounded-xl font-bold
                       shadow-lg shadow-blue-900/20
                       hover:bg-[#003366]
                       disabled:opacity-50
                       transition-all"
              >
                {{ saving ? "Saving..." : "Update Profile" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

const defaultProfile =
  "https://ui-avatars.com/api/?background=004182&color=fff&name=User";

const showEditModal = ref(false);
const loading = ref(false);
const saving = ref(false);

const profile = ref({
  id: null,
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  bio: "",
  avatar: null,
  coverPhoto: null,
  createdAt: null,
  updatedAt: null,
});

const editForm = ref({
  firstName: "",
  lastName: "",
  username: "",
  bio: "",
});

const posts = ref([]);
const friends = ref([]);


const coverStyle = computed(() => {
  if (!profile.value.coverPhoto) {
    return {};
  }

  return {
    backgroundImage: `url(${profile.value.coverPhoto})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
});


const loadProfile = async () => {
  loading.value = true;

  try {
    const response = await api.get("/profile/me");

    profile.value = response.data.data.profile;
    editForm.value = {
      firstName: profile.value.firstName || "",
      lastName: profile.value.lastName || "",
      username: profile.value.username || "",
      bio: profile.value.bio || "",
    };
  } catch (error) {
    console.error(
      "Failed to load profile:",
      error.response?.data || error.message
    );
  } finally {
    loading.value = false;
  }
};

const openEditModal = () => {
  editForm.value = {
    firstName: profile.value.firstName || "",
    lastName: profile.value.lastName || "",
    username: profile.value.username || "",
    bio: profile.value.bio || "",
  };

  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const saveProfile = async () => {
  saving.value = true;

  try {
    const response = await api.patch(
      "/profile/me",
      {
        firstName: editForm.value.firstName,
        lastName: editForm.value.lastName,
        username: editForm.value.username,
        bio: editForm.value.bio,
      }
    );

    profile.value = response.data.data.profile;

    showEditModal.value = false;

    alert("Profile updated successfully.");
  } catch (error) {
    console.error(
      "Failed to update profile:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Failed to update profile."
    );
  } finally {
    saving.value = false;
  }
};



const handleAvatarChange = (event) => {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    alert("Please select an image.");
    return;
  }

  profile.value.avatar =
    URL.createObjectURL(file);

};


const handleCoverChange = (event) => {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    alert("Please select an image.");
    return;
  }

  profile.value.coverPhoto =
    URL.createObjectURL(file);

};



const formatDate = (date) => {
  if (!date) {
    return "Recently";
  }

  return new Date(date).toLocaleDateString();
};


onMounted(() => {
  loadProfile();
});
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

/* Modal transition */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
