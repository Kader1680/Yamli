<template>
  <main class="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-gray-50/50">

    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">
          People you may know
        </h1>

        <p class="text-gray-500 text-sm mt-1">
          Add friends to see their posts in your timeline.
        </p>
      </div>

      <!-- Tabs -->
      <div class="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
        <button
          @click="activeTab = 'suggestions'"
          :class="
            activeTab === 'suggestions'
              ? 'bg-[#004182] text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          "
          class="px-5 py-2 rounded-lg text-sm font-bold transition-all"
        >
          Suggestions
        </button>

        <button
          @click="activeTab = 'requests'"
          :class="
            activeTab === 'requests'
              ? 'bg-[#004182] text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50'
          "
          class="px-5 py-2 rounded-lg text-sm font-bold transition-all"
        >
          Friend Requests

          <span
            v-if="friendRequests.length > 0"
            class="ml-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full"
          >
            {{ friendRequests.length }}
          </span>
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div
        v-for="i in 8"
        :key="i"
        class="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse"
      >
        <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>

        <div class="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>

        <div class="h-3 bg-gray-100 rounded w-1/2 mx-auto mb-6"></div>

        <div class="flex gap-2 w-full">
          <div class="h-10 bg-gray-200 rounded-lg flex-1"></div>
          <div class="h-10 bg-gray-100 rounded-lg flex-1"></div>
        </div>
      </div>
    </div>

    <!-- ==================== -->
    <!-- Suggestions -->
    <!-- ==================== -->

    <div
      v-else-if="activeTab === 'suggestions'"
      class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div
        v-for="user in suggestions"
        :key="user.id"
        class="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 flex flex-col items-center transition-all duration-300 transform hover:-translate-y-1"
      >

        <!-- Avatar -->
        <div class="relative mb-4">
          <img
            :src="getAvatar(user)"
            :alt="user.username"
            class="w-28 h-28 rounded-full object-cover border-4 border-gray-50 group-hover:border-[#004182]/20 transition-all"
          />

          <div
            class="absolute bottom-1 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"
          ></div>
        </div>

        <!-- Username -->
        <h2
          class="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#004182] transition-colors"
        >
          {{ user.username }}
        </h2>

        <p class="text-xs text-gray-400 mb-6 flex items-center gap-1">
          <i class="fa-solid fa-user-group"></i>
          12 Mutual Friends
        </p>

        <!-- Buttons -->
        <div class="flex gap-2 w-full mt-auto">

          <!-- No relationship -->
          <button
            v-if="!user.friendship"
            @click="addFriend(user.id)"
            :disabled="sendingRequest === user.id"
            class="flex-1 bg-[#004182] hover:bg-[#003366] disabled:opacity-60 text-white text-sm font-bold py-2.5 rounded-xl shadow-lg shadow-blue-900/10 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <i class="fa-solid fa-user-plus text-xs"></i>

            {{
              sendingRequest === user.id
                ? 'Sending...'
                : 'Add Friend'
            }}
          </button>

          <!-- Request already sent -->
          <button
            v-else-if="
              user.friendship.status === 'PENDING' &&
              user.friendship.direction === 'SENT'
            "
            disabled
            class="flex-1 bg-gray-100 text-gray-500 text-sm font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
          >
            <i class="fa-solid fa-clock text-xs"></i>
            Request Sent
          </button>

          <!-- Already friends -->
          <button
            v-else-if="user.friendship.status === 'ACCEPTED'"
            @click="removeFriend(user.friendship.id)"
            class="flex-1 bg-green-100 hover:bg-red-100 hover:text-red-600 text-green-700 text-sm font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <i class="fa-solid fa-user-check text-xs"></i>
            Friends
          </button>

        </div>
      </div>
    </div>

    <!-- ==================== -->
    <!-- Friend Requests -->
    <!-- ==================== -->

    <div
      v-else-if="activeTab === 'requests'"
      class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div
        v-for="request in friendRequests"
        :key="request.id"
        class="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center"
      >

        <div class="relative mb-4">
          <img
            :src="getAvatar(request.sender)"
            :alt="request.sender.username"
            class="w-28 h-28 rounded-full object-cover border-4 border-gray-50"
          />
        </div>

        <h2 class="text-lg font-bold text-gray-800 mb-1">
          {{ request.sender.username }}
        </h2>

        <p class="text-xs text-gray-400 mb-6">
          Sent you a friend request
        </p>

        <div class="flex gap-2 w-full">

          <!-- Accept -->
          <button
            @click="acceptRequest(request.id)"
            :disabled="processingRequest === request.id"
            class="flex-1 bg-[#004182] hover:bg-[#003366] disabled:opacity-60 text-white text-sm font-bold py-2.5 rounded-xl"
          >
            {{
              processingRequest === request.id
                ? 'Processing...'
                : 'Accept'
            }}
          </button>

          <!-- Reject -->
          <button
            @click="rejectRequest(request.id)"
            :disabled="processingRequest === request.id"
            class="flex-1 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 text-sm font-bold py-2.5 rounded-xl"
          >
            Reject
          </button>

        </div>
      </div>
    </div>

    <!-- Empty Suggestions -->
    <div
      v-if="
        !loading &&
        activeTab === 'suggestions' &&
        suggestions.length === 0
      "
      class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200"
    >
      <i class="fa-solid fa-user-slash text-5xl text-gray-200 mb-4"></i>

      <h3 class="text-xl font-bold text-gray-800">
        No suggestions yet
      </h3>

      <p class="text-gray-500">
        Check back later for more connections.
      </p>
    </div>

    <!-- Empty Requests -->
    <div
      v-if="
        !loading &&
        activeTab === 'requests' &&
        friendRequests.length === 0
      "
      class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200"
    >
      <i class="fa-solid fa-user-check text-5xl text-gray-200 mb-4"></i>

      <h3 class="text-xl font-bold text-gray-800">
        No friend requests
      </h3>

      <p class="text-gray-500">
        You don't have any pending friend requests.
      </p>
    </div>

  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";


const router = useRouter();

const suggestions = ref([]);
const friendRequests = ref([]);

const loading = ref(true);

const activeTab = ref("suggestions");

const sendingRequest = ref(null);
const processingRequest = ref(null);


const api = axios.create({
  baseURL: "http://localhost:3000/api",
});


// Add JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// If token is invalid or expired
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      router.push("/login");
    }

    return Promise.reject(error);
  }
);


// Get avatar
const getAvatar = (user) => {
  if (user?.avatar?.trim()) {
    return user.avatar;
  }

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.username || "User"
  )}&background=004182&color=fff`;
};


// Get users/suggestions
const fetchSuggestions = async () => {
  const response = await axios.get("http://localhost:3000/all-users");
console.log(response.data.data.users)

  suggestions.value = response.data.data.users || response.data;
};


// Get pending requests
const fetchFriendRequests = async () => {
  const response = await api.get("/friendships/requests");
console.log(response.data)

  friendRequests.value = response.data.data || response.data;
};


// Load all data
const fetchFriendsData = async () => {
  loading.value = true;

  try {
    await Promise.all([
      fetchSuggestions(),
      fetchFriendRequests(),
    ]);

  } catch (error) {
    console.error(
      "Error loading friends:",
      error.response?.data || error.message
    );

  } finally {
    loading.value = false;
  }
};


// Send friend request
const addFriend = async (receiverId) => {
  try {
    sendingRequest.value = receiverId;

    const response = await api.post(
      "/friendships/request",
      {
        receiverId,
      }
    );

    console.log("Friend request sent:", response.data);


    // Update UI without reloading
    const user = suggestions.value.find(
      (user) => user.id === receiverId
    );

    if (user) {
      user.friendship = {
        id: response.data.data.id,
        status: "PENDING",
        direction: "SENT",
      };
    }

  } catch (error) {
    console.error(
      "Error sending request:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Could not send friend request"
    );

  } finally {
    sendingRequest.value = null;
  }
};


// Accept friend request
const acceptRequest = async (friendshipId) => {
  try {
    processingRequest.value = friendshipId;

    await api.patch(
      `/friendships/${friendshipId}/accept`
    );


    // Remove from requests list
    friendRequests.value = friendRequests.value.filter(
      (request) => request.id !== friendshipId
    );


    // Refresh suggestions to update friendship status
    await fetchSuggestions();

  } catch (error) {
    console.error(
      "Error accepting request:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Could not accept friend request"
    );

  } finally {
    processingRequest.value = null;
  }
};


// Reject friend request
const rejectRequest = async (friendshipId) => {
  try {
    processingRequest.value = friendshipId;

    await api.patch(
      `/friendships/${friendshipId}/reject`
    );


    // Remove request from UI
    friendRequests.value = friendRequests.value.filter(
      (request) => request.id !== friendshipId
    );


    await fetchSuggestions();

  } catch (error) {
    console.error(
      "Error rejecting request:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Could not reject friend request"
    );

  } finally {
    processingRequest.value = null;
  }
};


// Remove friend
const removeFriend = async (friendshipId) => {
  try {
    const confirmed = confirm(
      "Are you sure you want to remove this friend?"
    );

    if (!confirmed) {
      return;
    }


    await api.delete(
      `/friendships/${friendshipId}`
    );


    await fetchSuggestions();

  } catch (error) {
    console.error(
      "Error removing friend:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Could not remove friend"
    );
  }
};


onMounted(() => {
  fetchFriendsData();
});
</script>

<style scoped>
* {
  transition:
    background-color 0.2s,
    color 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
