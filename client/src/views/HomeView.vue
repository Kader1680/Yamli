<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-900">
    <main class="max-w-7xl mx-auto flex flex-col md:flex-row pt-8 px-4 gap-8">

      <aside class="hidden lg:block w-1/4 sticky top-8 h-fit">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="p-4 border-b border-gray-100 bg-gray-50/50">
            <h2 class="font-bold text-gray-700 flex items-center gap-2">
              <i class="fa-solid fa-bars text-[#004182]"></i> Menu
            </h2>
          </div>
          <ul class="p-2 space-y-1">
            <li v-for="item in menuItems" :key="item.label"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-gray-100 cursor-pointer group">
              <i :class="[item.icon, 'text-gray-500 group-hover:text-[#004182] w-5']"></i>
              <span class="text-sm font-medium text-gray-600 group-hover:text-[#004182] capitalize">{{ item.label }}</span>
            </li>
          </ul>
        </div>
      </aside>
      <section class="flex-1 max-w-2xl space-y-6">

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
            <div class="flex-1">
              <textarea
                v-model="content"
                placeholder="What's on your mind?"
                class="w-full p-0 border-none focus:ring-0 text-lg resize-none placeholder-gray-400"
                rows="2"
              ></textarea>
            </div>
          </div>

          <div v-if="previewUrl" class="mt-4 relative rounded-xl overflow-hidden border border-gray-100">
            <button @click="previewUrl = ''; media = null" class="absolute top-2 right-2 bg-black/50 text-white w-8 h-8 rounded-full hover:bg-black/70 z-10">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <img v-if="isImageFile" :src="previewUrl" class="w-full max-h-96 object-cover" />
            <video v-else controls class="w-full max-h-96"><source :src="previewUrl" /></video>
          </div>

          <hr class="my-4 border-gray-100" />

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors text-gray-600">
              <i class="fa-solid fa-image text-green-500"></i>
              <span class="text-sm font-semibold">Photo/Video</span>
              <input type="file" accept="image/*,video/*" class="hidden" @change="handleFileUpload" />
            </label>

            <button
              @click="submitPost"
              :disabled="loading || (!content.trim() && !media)"
              class="bg-[#004182] hover:bg-[#003366] text-white font-bold px-6 py-2 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <i v-if="loading" class="fa-solid fa-circle-notch animate-spin mr-2"></i>
              {{ loading ? 'Posting...' : 'Post' }}
            </button>
          </div>
        </div>

        <div v-if="allposts.length === 0" class="text-center py-10 text-gray-400">
           <i class="fa-solid fa-rss text-4xl mb-3"></i>
           <p>No posts to show yet.</p>
        </div>




        <div v-for="(post, index) in allposts" :key="index" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
          <div class="p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">


              <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-[#97a2ad] flex items-center justify-center text-white font-bold">
              <img width="70" class="rounded-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/3840px-User-avatar.svg.png"/>
              </div>


              <div>

                <h3 class="font-bold text-gray-900 leading-tight">
                  {{ post.username }}
                </h3>

                <span class="text-xs text-gray-500">33 min • <i class="fa-solid fa-earth-americas"></i></span>
              </div>
            </div>

            <div class="relative group">
              <button class="p-2 hover:bg-gray-100 rounded-full text-gray-400"><i class="fa-solid fa-ellipsis-h"></i></button>
              <div class="hidden group-hover:block absolute right-0 w-32 bg-white border border-gray-100 shadow-xl rounded-lg z-20">
                <router-link :to="`/post/edit/${post._id}`" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit Post</router-link>
                <button @click="deletePost(post._id)" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete</button>
              </div>
            </div>
          </div>






          <div class="px-4 pb-3">
            <p class="text-gray-800 whitespace-pre-wrap">{{ post.content }}</p>
          </div>

          <div v-if="post.media" class="bg-black flex justify-center">
            <img v-if="isImage(post.media)" :src="`http://localhost:3000${post.media}`" class="max-h-[500px] w-full object-contain bg-gray-100" />
            <video v-else controls class="max-h-[500px] w-full shadow-inner">
              <source :src="post.media" />
            </video>
          </div>

          <div class="px-4 py-2 flex items-center justify-between text-xs text-gray-500 border-b border-gray-50">
            <div class="flex items-center gap-1">
              <span class="flex items-center justify-center w-4 h-4 bg-[#004182] text-white rounded-full text-[8px]"><i class="fa-solid fa-thumbs-up"></i></span>
              Liked by others
            </div>
            <span>0 comments • 0 shares</span>
          </div>

          <div class="px-2 py-1 flex items-center justify-around">
            <button @click="likePost(post._id)" class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg hover:bg-gray-100 text-gray-600 font-semibold transition-colors">
              <i class="fa-regular fa-thumbs-up text-xl"></i> Like
            </button>
            <button class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg hover:bg-gray-100 text-gray-600 font-semibold transition-colors">
              <i class="fa-regular fa-comment text-xl"></i> Comment
            </button>
            <button class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg hover:bg-gray-100 text-gray-600 font-semibold transition-colors">
              <i class="fa-solid fa-share text-xl"></i> Share
            </button>
          </div>
        </div>


      </section>

      <aside class="hidden md:block w-1/4 sticky top-8 h-fit">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-bold text-gray-700">Contacts</h2>
            <i class="fa-solid fa-magnifying-glass text-gray-400 text-sm"></i>
          </div>
          <ul class="space-y-4">
            <li v-for="friend in friends" :key="friend" class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors">
              <div class="relative">
                <div class="w-9 h-9 bg-gray-200 rounded-full border border-gray-100"></div>
                <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <span class="text-sm font-medium text-gray-700">{{ friend }}</span>
            </li>
          </ul>
        </div>
      </aside>

    </main>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue';

const content = ref('');
const media = ref(null);
const previewUrl = ref('');
const isImageFile = ref(true);
const loading = ref(false);
const error = ref(null);
const allposts = ref([]);


import { provide } from "vue";

const user = ref(JSON.parse(localStorage.getItem("user")));

provide("username", user.value?.username);




// Mock data for sidebars
const menuItems = [
  { label: 'saved items', icon: 'fa-solid fa-bookmark' },
  { label: 'reels & video', icon: 'fa-brands fa-youtube' },
  { label: 'groups', icon: 'fa-solid fa-user-group' },
  { label: 'marketspace', icon: 'fa-solid fa-store' },
  { label: 'settings', icon: 'fa-solid fa-gear' },
];
const friends = ['Ahmed Li', 'Meissa Lane', 'Fouzi Abdelrahim'];


const submitPost = async () => {
  if (!content.value.trim() && !media.value) {
    alert('Please add some content or media to your post');
    return;
  }
  try {
    loading.value = true;
    const formData = new FormData();
    formData.append('content', content.value);
    const user = JSON.parse(localStorage.getItem('user'));
    formData.append('id_user', user._id || user.id);
    if (media.value) formData.append('image', media.value);

    const res = await axios.post('http://localhost:3000/post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    content.value = '';
    media.value = null;
    previewUrl.value = '';
    if (res.data.post) allposts.value.unshift(res.data.post);
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to create post');
  } finally {
    loading.value = false;
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.match(/^(image|video)/)) {
    alert('Please upload an image or video file');
    return;
  }
  media.value = file;
  previewUrl.value = URL.createObjectURL(file);
  isImageFile.value = file.type.startsWith('image/');
};

const isImage = (media) => {
  return media && /\.(jpg|jpeg|png|gif)$/i.test(media);
};

const fetchPosts = async () => {
  try {
    loading.value = true;
    const response = await axios.get('http://localhost:3000/');
    allposts.value = response.data.posts || response.data;

    username.value = response.data.nameUser || '';

    console.log(JSON.parse(JSON.stringify(username.value)));





    console.log("Fetched posts:", allposts.value);
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPosts);

const deletePost = async (postId) => {
  if (!confirm("Are you sure you want to delete this post?")) return;
  try {
    await axios.delete(`http://localhost:3000/post/${postId}`);
    allposts.value = allposts.value.filter(post => post._id !== postId);
  } catch (error) {
    alert("Failed to delete the post.");
  }
};

const likePost = async (postId) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    await axios.post('http://localhost:3000/', {
      id_post: postId,
      id_user: user.id || user._id,
    });
  } catch (err) {
    console.error("Error liking post");
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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


