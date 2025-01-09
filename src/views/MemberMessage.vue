<script setup>
import ChatBox from "../components/chatbox.vue"
import MemberNavbar from "../components/MemberNavbar.vue"

window.scrollTo(0, 0)
</script>

<template>
  <MemberNavbar />
  <div class="lg:px-10 pb-10">
    <div class="mx-auto max-w-[1358px] border border-solid border-t-0 border-[#ddd]">
      <ChatBox class="bg-white" />
    </div>
  </div>
</template>
