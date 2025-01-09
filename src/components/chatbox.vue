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
  messages.value = [...userMsg.value, ...systemMsg.value].sort((msgBefore, msgAfter) => new Date(msgBefore.time) - new Date(msgAfter.time))

  setTimeout(() => {
    // 模擬系統回應
    systemMsg.value.push({
      text: botReply,
      isUser: false,
      time: new Date(),
    })
    messages.value = [...userMsg.value, ...systemMsg.value].sort((msgBefore, msgAfter) => new Date(msgBefore.time) - new Date(msgAfter.time))
  }, 1000)
}
</script>

<template>
  <section class="memberMessage">
    <div class="messageBox text-center text-xl">
      <div class="chatBox">
        <nav class="messageNav p-[10px] text-base font-semibold text-[#314e86]">Left & Right 飾品</nav>
        <div class="chatContent">
          <ul>
            <li v-for="(message, index) in messages" :key="index" :class="message.isUser ? 'umsg' : 'smsg'" class="message-item">
              {{ message.text }}
            </li>
          </ul>
        </div>
        <textarea @keyup.enter="sendMessage" placeholder="輸入訊息" name="" id="chatBox" v-model="userInput" class="input-field"></textarea>
        <div class="messageBtn">
          <button @click="sendMessage" class="btn">傳送</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.umsg {
  text-align: right;
}

.smsg {
  text-align: left;
}

.chatContent ul {
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

.memberMessage {
  margin: 0 auto;
  width: 1358px;
  max-width: 100%;
  padding: 16px 0;
}

.messageNav {
  background-color: #f9f9f9;
}

.chatBox {
  border: 1px #e2e8f0 solid;
  max-width: 650px;
  margin: auto;
  margin-bottom: 30px;
  margin-top: 20px;
}

.chatContent {
  min-height: 200px;
}

.messageBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.btn {
  display: block;
  margin: 10px;
  width: 100px;
  height: 32px;
  background-color: #314e86;
  color: #fff;
  border-radius: 8px;
  border: #000000 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}
.btn:hover {
  background-color: #6a88be;
  color: #fff;
  border: #000000 1px solid;
}

#chatBox {
  width: 80%;
  height: 100px;
  border: 1px #e2e8f0 solid;
  border-radius: 3px;
  font-size: 14px;
  resize: none;
  padding: 10px;
}

@media (width<=768px) {
  .messageBox {
    width: 100%;
  }
}
</style>
