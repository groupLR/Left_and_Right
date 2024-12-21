<script setup>
import { ElMessage } from "element-plus"
import { jwtDecode } from "jwt-decode" // 之後有取得會員資料 API，我就不用在前端解了
import { onMounted, reactive, ref } from "vue"
import { storeToRefs } from "pinia"
import { useSharedCartStore } from "@/stores/sharedCart"
import AddMemberInput from "./AddMemberInput.vue"
const SharedCartStore = useSharedCartStore()
const { userEmailList } = storeToRefs(SharedCartStore)

const dialogFormVisible = ref(false)

const props = defineProps({
  groupId: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    required: true,
  },
})

const form = reactive({
  emails: [""],
})
const inputCount = ref(1)

const addInput = () => {
  inputCount.value++
  form.emails.push("") // 新增一個空字串到陣列
}

const removeInput = (index) => {
  form.emails.splice(index, 1)
  inputCount.value--
  // 確保至少保留一個輸入框
  if (form.emails.length === 0) {
    form.emails.push("")
    inputCount.value = 1
  }
}

// 定義 emit 用在成功新增好友後，通知父元件重新取得資料
const emit = defineEmits(["memberAdded"])

const addMembers = async () => {
  const JWT = localStorage.getItem("TwT")
  const { email: userEmail } = jwtDecode(JWT)

  // 如果有任何一個驗證失敗，就不繼續執行
  const hasError = form.emails.some((email) => {
    if (email === "") {
      ElMessage.error("請正確輸入信箱")
      return true
    }

    if (userEmail === email) {
      ElMessage.error("請不要輸入自己的信箱")
      return true
    }

    const found = userEmailList.value.includes(email)
    if (!found) {
      ElMessage.error("請輸入正確的好友信箱")
      return true
    }

    return false
  })

  if (hasError) return

  // 如果都沒有錯誤，才執行新增
  try {
    await SharedCartStore.addMemberToSharedCart(props.groupId, form.emails)
    emit("memberAdded")
    form.emails = [""]
    inputCount.value = 1 // 重置輸入框數量
    dialogFormVisible.value = false
    ElMessage.success("成功新增好友到共享購物車")
  } catch (err) {
    console.error(err)
    ElMessage.error("新增好友失敗")
  }
}

onMounted(async () => {
  await SharedCartStore.getAllUserEmail()
})
</script>

<template>
  <el-button plain @click="dialogFormVisible = true">新增好友</el-button>
  <el-dialog v-model="dialogFormVisible" title="新增共享購物車" width="80%" class="max-w-[500px]">
    <button @click="addInput">+</button>
    <el-form :model="form" class="responsiveForm">
      <AddMemberInput v-for="(input, index) in inputCount" :key="index" v-model="form.emails[index]" @remove="removeInput(index)" />
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addMembers">新增</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped>
/* 小螢幕時變成上下排列 */
@media screen and (max-width: 768px) {
  .responsiveForm :deep(.el-form-item) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .responsiveForm :deep(.el-form-item__label) {
    text-align: left;
    padding: 0;
  }
}

.el-button.is-plain {
  --el-button-hover-text-color: #000;
  --el-button-hover-bg-color: #343232;
  --el-button-hover-border-color: #000;
}

.el-button:hover {
  border-color: #212121;
  color: #fff;
  outline: none;
  background-color: #2f2f2f;
}

.el-button--primary {
  --el-button-text-color: var(--el-color-white);
  --el-button-bg-color: #000;
  --el-button-border-color: #000;
  --el-button-outline-color: #343232;
  --el-button-active-color: #293232;
  --el-button-hover-text-color: #fff;
  --el-button-hover-link-text-color: #343232;
  --el-button-hover-bg-color: #2f2f2f;
  --el-button-hover-border-color: #2f2f2f;
  --el-button-active-bg-color: #293232;
  --el-button-active-border-color: #293232;
  --el-button-disabled-text-color: var(--el-color-white);
  --el-button-disabled-bg-color: #343232;
  --el-button-disabled-border-color: #343232;
}
</style>
