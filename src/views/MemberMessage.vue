<script setup>
import ChatBox from "../components/chatbox.vue"
import MemberNavbar from "../components/MemberNavbar.vue"

window.scrollTo(0, 0)
</script>

<template>
  <MemberNavbar />
  <div class="lg:px-10 pb-10">
    <ChatBox class="bg-white" />
  </div>
</template>
