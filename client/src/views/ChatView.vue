<template>
  <div class="max-w-7xl mx-auto md:mt-6 px-4">
    <div class="bg-white rounded-2xl shadow-xl border border-gray-200 flex overflow-hidden h-[85vh]">

      <aside
        class="w-full md:w-80 border-r border-gray-100 flex flex-col bg-gray-50/30"
        :class="{ 'hidden md:flex': selectedFriend }"
      >
        <div class="p-5 border-b border-gray-100 bg-white">
          <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
            <i class="fa-solid fa-message text-[#004182]"></i>
            Messages
          </h2>
          <div class="mt-4 relative">
            <input
              type="text"
              placeholder="Search friends..."
              class="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#004182]/20"
            />
            <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto">
          <ul class="p-2 space-y-1">
            <li
              v-for="friend in friends"
              :key="friend._id"
              @click="selectFriend(friend)"
              class="flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 group"
              :class="selectedFriend?._id === friend._id ? 'bg-white shadow-md' : 'hover:bg-white/60'"
            >
              <div class="relative">
                <img
                  src="https://ui-avatars.com/api/?name=User&background=004182&color=fff"
                  class="w-12 h-12 rounded-full border-2"
                  :class="selectedFriend?._id === friend._id ? 'border-[#004182]' : 'border-transparent'"
                />
                <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-baseline">
                  <h4 class="font-bold text-gray-900 truncate">{{ friend.username }}</h4>
                  <span class="text-[10px] text-gray-400">12:45 PM</span>
                </div>
                <p class="text-xs text-gray-500 truncate">Click to open conversation</p>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      <main
        class="flex-1 flex flex-col bg-white"
        :class="{ 'hidden': !selectedFriend && isMobile, 'flex': selectedFriend }"
      >
        <template v-if="selectedFriend">
          <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md z-10">
            <div class="flex items-center gap-3">
              <button @click="selectedFriend = null" class="md:hidden p-2 text-gray-500">
                <i class="fa-solid fa-chevron-left"></i>
              </button>
              <div class="w-10 h-10 rounded-full bg-[#004182] flex items-center justify-center text-white font-bold">
                {{ selectedFriend.username.charAt(0).toUpperCase() }}
              </div>
              <div>
                <h3 class="font-bold text-gray-900 leading-tight">{{ selectedFriend.username }}</h3>
                <span class="text-xs text-green-500 font-medium">Online</span>
              </div>
            </div>
            <div class="flex gap-4 text-gray-400">
              <i class="fa-solid fa-phone hover:text-[#004182] cursor-pointer"></i>
              <i class="fa-solid fa-video hover:text-[#004182] cursor-pointer"></i>
              <i class="fa-solid fa-circle-info hover:text-[#004182] cursor-pointer"></i>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-6 bg-[#f8f9fa] space-y-4 messages-container">
            <div
              v-for="msg in messages"
              :key="msg._id || msg.createdAt"
              class="flex flex-col"
              :class="msg.senderId === userId ? 'items-end' : 'items-start'"
            >
              <div
                class="max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-sm"
                :class="msg.senderId === userId
                  ? 'bg-[#004182] text-white rounded-tr-none'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'"
              >
                {{ msg.message }}
              </div>
              <span class="text-[10px] text-gray-400 mt-1 px-1">
                {{ msg.senderId === userId ? 'You' : selectedFriend.username }} • 12:46 PM
              </span>
            </div>
          </div>

          <div class="p-4 bg-white border-top border-gray-100">
            <div class="flex items-center gap-3 bg-gray-100 p-2 rounded-2xl">
              <button class="p-2 text-gray-400 hover:text-[#004182]">
                <i class="fa-solid fa-paperclip"></i>
              </button>
              <input
                v-model="newMessage"
                placeholder="Type a message..."
                class="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
                @keyup.enter="handleSendMessage"
              />
              <button
                @click="handleSendMessage"
                :disabled="!newMessage.trim()"
                class="w-10 h-10 bg-[#004182] text-white rounded-xl flex items-center justify-center disabled:opacity-50 transition-transform active:scale-95"
              >
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </template>

        <div v-else class="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50/50">
          <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
             <i class="fa-solid fa-comments text-4xl text-[#004182]/20"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800">Your Private Space</h3>
          <p class="text-gray-500 max-w-xs mt-2 text-sm">Select a friend from the left to start a professional conversation.</p>
        </div>
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const messages = ref([]);
const newMessage = ref('');
const friends = ref([]);
const selectedFriend = ref(null);

const route = useRoute();
const router = useRouter();

const user = JSON.parse(localStorage.getItem('user'));
const userId = user?._id;

// Logic for scrolling to bottom
const scrollToBottom = () => {
  setTimeout(() => {
    const container = document.querySelector('.messages-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, 50);
};

const fetchFriends = async () => {
  try {
    const response = await axios.get('http://localhost:3000/chat', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    friends.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const fetchMessages = async (friendId) => {
  if (!friendId) return;
  try {
    const response = await axios.get(`http://localhost:3000/chat/${friendId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    messages.value = response.data;
    scrollToBottom();
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

const selectFriend = (friend) => {
  selectedFriend.value = friend;
  router.push(`/chat/${friend._id}`);
  fetchMessages(friend._id);
};

const handleSendMessage = async () => {
  if (!newMessage.value.trim() || !selectedFriend.value) return;

  const messageData = {
    senderId: userId,
    receiverId: selectedFriend.value._id,
    message: newMessage.value.trim()
  };

  try {
    const response = await axios.post(`http://localhost:3000/chat/${selectedFriend.value._id}`, messageData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    messages.value.push(response.data);
    newMessage.value = '';
    scrollToBottom();
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

onMounted(async () => {
  await fetchFriends();
  if (route.params.friendId) {
    const friend = friends.value.find(f => f._id === route.params.friendId);
    if (friend) {
      selectedFriend.value = friend;
      await fetchMessages(friend._id);
    }
  }
});

watch(() => route.params.friendId, async (newId) => {
  if (newId) {
    const friend = friends.value.find(f => f._id === newId);
    if (friend) {
      selectedFriend.value = friend;
      await fetchMessages(friend._id);
    }
  }
});
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #004182;
}

/* Custom Message Bubble Transitions */
.messages-container div {
    transition: all 0.3s ease;
}
</style>
