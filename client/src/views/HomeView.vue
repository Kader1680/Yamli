<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-900">
    <main class="max-w-7xl mx-auto flex flex-col md:flex-row pt-8 px-4 gap-8">

      <!-- Left Sidebar -->
      <aside class="hidden lg:block w-1/4 sticky top-8 h-fit">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="p-4 border-b border-gray-100 bg-gray-50/50">
            <h2 class="font-bold text-gray-700 flex items-center gap-2">
              <i class="fa-solid fa-bars text-[#004182]"></i>
              Menu
            </h2>
          </div>

          <ul class="p-2 space-y-1">
            <li
              v-for="item in menuItems"
              :key="item.label"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-gray-100 cursor-pointer group"
            >
              <i
                :class="[
                  item.icon,
                  'text-gray-500 group-hover:text-[#004182] w-5'
                ]"
              ></i>

              <span
                class="text-sm font-medium text-gray-600 group-hover:text-[#004182] capitalize"
              >
                {{ item.label }}
              </span>
            </li>
          </ul>
        </div>
      </aside>

      <!-- Main Feed -->
      <section class="flex-1 max-w-2xl space-y-6">

        <!-- Create Post -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div class="flex gap-4">
 
            <div
              class="w-10 h-10 flex rounded-full bg-gray-200 flex-shrink-0  "
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/3840px-User-avatar.svg.png"
                class="w-full h-full object-cover"
                alt="User avatar"
              />

                
            </div> <br> 



            <div class="">
              <textarea
                v-model="content"
                placeholder="What's on your mind?"
                class="w-full p-0 border-none focus:ring-0 text-lg resize-none placeholder-gray-400"
                rows="2"
              ></textarea>
            </div>
          </div>

          <hr class="my-4 border-gray-100" />

          <div class="flex items-center justify-end">
            <button
              @click="submitPost"
              :disabled="loading || !content.trim()"
              class="bg-[#004182] hover:bg-[#003366] text-white font-bold px-6 py-2 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <i
                v-if="loading"
                class="fa-solid fa-circle-notch animate-spin mr-2"
              ></i>

              {{ loading ? "Posting..." : "Post" }}
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="!loading && allPosts.length === 0"
          class="text-center py-10 text-gray-400"
        >
          <i class="fa-solid fa-rss text-4xl mb-3"></i>
          <p>No posts to show yet.</p>
        </div>

        <!-- Posts -->
        <div
          v-for="post in allPosts"
          :key="post.id"
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in"
        >

          <div class="p-4 flex items-center justify-between">

            <div class="flex items-center gap-3">

              <div
                class="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-[#97a2ad] flex items-center justify-center overflow-hidden"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/3840px-User-avatar.svg.png"
                  class="w-full h-full object-cover"
                  alt="User avatar"
                />
              </div>

              <div>
                <h3 class="font-bold text-blue-900 leading-tight">
                  <a  :href="`/profil/${post.user.id}`" class="hover:underline">
                    {{ post.user.firstName }} {{ post.user.lastName }}
                  </a>
                </h3>

                <span class="text-xs text-gray-500">
                  {{ formatDate(post.createdAt) }}
                  •
                  <i class="fa-solid fa-earth-americas"></i>
                </span>
              </div>

            </div>

            <!-- Post Actions -->
            <div class="relative group">
              <button
                class="p-2 hover:bg-gray-100 rounded-full text-gray-400"
              >
                <i class="fa-solid fa-ellipsis-h"></i>
              </button>

              <div
                class="hidden group-hover:block absolute right-0 w-32 bg-white border border-gray-100 shadow-xl rounded-lg z-20"
              >
                <button
                  @click="deletePost(post.id)"
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>

          </div>

          <!-- Post Content -->
          <div class="px-4 pb-3">
            <p class="text-gray-800 whitespace-pre-wrap">
              {{ post.content }}
            </p>
          </div>

          <!-- Post Footer -->
          <div
            class="px-4 py-2 flex items-center justify-between text-xs text-gray-500 border-b border-gray-50"
          >
            <div class="flex items-center gap-1">
              <span
                class="flex items-center justify-center w-4 h-4 bg-[#004182] text-white rounded-full text-[8px]"
              >
                <i class="fa-solid fa-thumbs-up"></i>
              </span>

              Liked by others
            </div>

            <span>0 comments • 0 shares</span>
          </div>

          <!-- Post Buttons -->
          <div class="px-2 py-1 flex items-center justify-around">

            <button
              @click="likePost(post.id)"
              class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg hover:bg-gray-100 text-gray-600 font-semibold transition-colors"
            >
              <i class="fa-regular fa-thumbs-up text-xl"></i>
              Like
            </button>

            <button
              class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg hover:bg-gray-100 text-gray-600 font-semibold transition-colors"
            >
              <i class="fa-regular fa-comment text-xl"></i>
              Comment
            </button>

            <button
              class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg hover:bg-gray-100 text-gray-600 font-semibold transition-colors"
            >
              <i class="fa-solid fa-share text-xl"></i>
              Share
            </button>

          </div>
        </div>

      </section>

      <!-- Right Sidebar -->
      <aside class="hidden md:block w-1/4 sticky top-8 h-fit">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">

          <div class="flex items-center justify-between mb-4">
            <h2 class="font-bold text-gray-700">
              Contacts
            </h2>

            <i class="fa-solid fa-magnifying-glass text-gray-400 text-sm"></i>
          </div>

          <ul class="space-y-4">
            <li
              v-for="friend in friends"
              :key="friend"
              class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors"
            >
              <div class="relative">
                <div
                  class="w-9 h-9 bg-gray-200 rounded-full border border-gray-100"
                ></div>

                <div
                  class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"
                ></div>
              </div>

              <span class="text-sm font-medium text-gray-700">
                {{ friend }}
              </span>
            </li>
          </ul>

        </div>
      </aside>

    </main>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const content = ref("");
const loading = ref(false);
const allPosts = ref([]);
const error = ref(null);

const user = ref(
  JSON.parse(localStorage.getItem("user") || "null")
);

const menuItems = [
  {
    label: "saved items",
    icon: "fa-solid fa-bookmark",
  },
  {
    label: "reels & video",
    icon: "fa-brands fa-youtube",
  },
  {
    label: "groups",
    icon: "fa-solid fa-user-group",
  },
  {
    label: "marketspace",
    icon: "fa-solid fa-store",
  },
  {
    label: "settings",
    icon: "fa-solid fa-gear",
  },
];

const friends = [
  "Ahmed Li",
  "Meissa Lane",
  "Fouzi Abdelrahim",
];


const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};


const submitPost = async () => {
  const postContent = content.value.trim();

  if (!postContent) {
    alert("Please write something before posting.");
    return;
  }

  try {
    loading.value = true;
    error.value = null;
    const response = await api.post(
      "/post",
      {
        content: postContent,
      },
      {
        headers: getAuthHeaders(),
      }
    );
    const newPost = response.data.data;

    if (newPost) {
      allPosts.value.unshift(newPost);
    }

    content.value = "";

  } catch (err) {
    console.error("Error creating post:", err);

    error.value =
      err.response?.data?.message ||
      "Failed to create post";

    alert(error.value);

  } finally {
    loading.value = false;
  }
};

const fetchPosts = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await api.get("/post");
console.log("Fetched posts:", response.data.data.posts);

    allPosts.value =
      response.data.data.posts ||
      [];

  } catch (err) {
    console.error("Error fetching posts:", err);

    error.value =
      err.response?.data?.message ||
      "Failed to fetch posts";

  } finally {
    loading.value = false;
  }
};


const deletePost = async (postId) => {
  if (!confirm("Are you sure you want to delete this post?")) {
    return;
  }

  try {
    await api.delete(`/post/${postId}`, {
      headers: getAuthHeaders(),
    });

    allPosts.value = allPosts.value.filter(
      (post) => post.id !== postId
    );

  } catch (err) {
    console.error("Error deleting post:", err);

    alert(
      err.response?.data?.message ||
      "Failed to delete the post."
    );
  }
};

const likePost = async (postId) => {
  try {
    console.log("Like post:", postId);


  } catch (err) {
    console.error("Error liking post:", err);
  }
};



const formatDate = (date) => {
  if (!date) {
    return "Just now";
  }

  return new Date(date).toLocaleString();
};

onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #004182;
}
</style>
