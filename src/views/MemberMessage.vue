<template>
	<div>
		<LogOut/>
		<MemberNavbar />
		<ChatBox />
	</div>
</template>

<script setup>
import ChatBox from "../components/chatbox.vue"
import MemberNavbar from "../components/MemberNavbar.vue"
import LogOut from "@/components/Logout.vue";
</script>
