<script setup>
import { ElMessage } from "element-plus"
import { jwtDecode } from "jwt-decode" // 之後有取得會員資料 API，我就不用在前端解了
import { onMounted, reactive, ref } from "vue"
import { storeToRefs } from "pinia"
import { useSharedCartStore } from "@/stores/sharedCart"
const SharedCartStore = useSharedCartStore()
const { userEmailList } = storeToRefs(SharedCartStore)

const dialogFormVisible = ref(false)

const form = reactive({
  name: "",
  email: "",
})

onMounted(async () => {
  await SharedCartStore.getAllUserEmail()
})

const emits = defineEmits(["createdSharedCart"])

const createSharedCart = async () => {
  const JWT = localStorage.getItem("TwT")
  const { email, userId } = jwtDecode(JWT)

  if (form.email === "") {
    ElMessage.error("請正確輸入信箱")
    return
  }

  if (email === form.email) {
    ElMessage.error("請不要輸入自己的信箱")
    return
  }

  const found = userEmailList.value.includes(form.email)
  if (!found) {
    ElMessage.error("請輸入正確的好友信箱")
    return
  }

  try {
    await SharedCartStore.creatSharedCart(form.name, userId, form.email)
    dialogFormVisible.value = false
    // 這裡是為了讓 在商品詳情創建共享購物車後 重新 fetch 一次資料
    emits("createdSharedCart")
    ElMessage.success("添加成功")
    await SharedCartStore.fetchSharedCartList(userId)
  } catch (err) {
    ElMessage.error("添加失敗")
  }
}
</script>

<template>
  <el-button plain @click="dialogFormVisible = true"> 新增共享購物車 </el-button>

  <el-dialog v-model="dialogFormVisible" title="新增共享購物車" width="80%" class="max-w-[500px]">
    <el-form :model="form" class="responsiveForm">
      <el-form-item label="共享購物車名稱">
        <el-input v-model="form.name" autocomplete="off" placeholder="爆買 L & R" />
      </el-form-item>
      <el-form-item label="好友信箱 *">
        <el-input v-model="form.email" autocomplete="off" placeholder="example@example.com" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createSharedCart"> 新增 </el-button>
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
  border-color: #314e86;
  color: #fff;
  outline: none;
  background-color: #314e86;
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
