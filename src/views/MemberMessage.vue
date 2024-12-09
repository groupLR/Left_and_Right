<template>
	<div>
		<SignOut/>
		<MemberNavbar />
		<ChatBox />
	</div>
</template>

<script setup>
import ChatBox from "../components/chatbox.vue"
import MemberNavbar from "../components/MemberNavbar.vue"
import SignOut from "@/components/SignOut.vue";
</script>
