<template>
	<body>
		<section class="member-message">
			<div class="message-box text-center text-xl">
				<div class="chat-box">
					<nav class="message-nav p-[10px]">Bonny & Read 飾品</nav>
					<div class="chatContent">
						<ul>
							<li
								v-for="(message, index) in messages"
								:key="index"
								:class="message.isUser ? 'umsg' : 'smsg'"
								class="message-item"
							>
								{{ message.text }}
							</li>
						</ul>
					</div>
					<textarea
						@keyup.enter="sendMessage"
						placeholder="輸入訊息"
						name=""
						id="chatBox"
						v-model="userInput"
						class="input-field"
					></textarea>
					<div class="message-btn">
						<button class="btn">
							<i class="fa fa-plus-circle"></i>加入圖片
						</button>
						<button @click="sendMessage" class="btn">傳送</button>
					</div>
				</div>
			</div>
		</section>
	</body>
</template>

<script setup>
import { ref } from "vue"
const userInput = ref("")
const messages = ref([])
const userMsg = ref([])
const systemMsg = ref([])

const botReply = "感謝您的訊息，我們會儘快回覆您！"

const sendMessage = () => {
	if (userInput.value.trim() === "") return

	// 使用者新增訊息
	userMsg.value.push({
		text: userInput.value,
		isUser: true,
		time: new Date(),
	})

	// 清空輸入框
	userInput.value = ""

	// 合併訊息並排序
	messages.value = [...userMsg.value, ...systemMsg.value].sort(
		(a, b) => new Date(a.time) - new Date(b.time)
	)

	setTimeout(() => {
		// 模擬系統回應
		systemMsg.value.push({
			text: botReply,
			isUser: false,
			time: new Date(),
		})
		messages.value = [...userMsg.value, ...systemMsg.value].sort(
			(a, b) => new Date(a.time) - new Date(b.time)
		)
	}, 1000)
}
</script>

<style scoped>
.umsg {
	text-align: right;
}

.smsg {
	text-align: left;
}

.chatContent ui {
	display: flex;
	flex-direction: column;
	gap: 2px;
	width: 100%;
}

.chatContent {
	display: flex;
	align-items: end;
	justify-content: center;
	margin-bottom: 5px;
	overflow-x: hidden;
}

* {
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 14px;
	color: #333333;
}

.member-message {
	margin: 0 auto;
	width: 1358px;
	max-width: 100%;
	border: 1px solid #ddd;
	border-top: 1px solid #fff;
}

.message-nav {
	background-color: #f9f9f9;
}

.chat-box {
	border: 1px #e2e8f0 solid;
	width: 650px;
	margin: auto;
	margin-bottom: 30px;
	margin-top: 20px;
}

.chatContent {
	min-height: 200px;
}

.message-btn {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
}

.btn {
	display: block;
	margin: 10px;
	width: 100px;
	height: 32px;
	background-color: #5b5b5b;
	color: #fff;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	font-size: 14px;
	font-weight: bold;
}

#chatBox {
	width: 630px;
	height: 100px;
	border: 1px #e2e8f0 solid;
	border-radius: 3px;
	font-size: 14px;
	resize: none;
	padding: 10px;
}

@media (width<=768px) {
	.message-box {
		width: 100%;
	}
}
</style>
