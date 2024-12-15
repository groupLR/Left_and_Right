<script setup>
import { ElMessage } from 'element-plus'
import { jwtDecode } from 'jwt-decode' // 之後有取得會員資料 API，我就不用在前端解了
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from "pinia";
import { useSharedCartStore } from '@/stores/sharedCart'
const SharedCartStore = useSharedCartStore()
const { userEmailList } = storeToRefs(SharedCartStore)

const dialogFormVisible = ref(false)

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

onMounted(async () => {
  await SharedCartStore.getAllUserEmail()
})
const createSharedCart = async () => {
  const JWT = localStorage.getItem("TwT")
  const { email: userEmail, userId } = jwtDecode(JWT)
  
  if(form.email === "") {
    ElMessage.error("請正確輸入信箱")
    return
  } 
  
  if(userEmail === form.email) {
    ElMessage.error('請不要輸入自己的信箱')
    return
  }
  
  const found = userEmailList.value.includes(form.email)
  if(!found) {
    ElMessage.error('請輸入正確的好友信箱')
    return
  }
  
  try {
    await SharedCartStore.creatSharedCart(form.name, userId, form.email)
    dialogFormVisible.value = false
    ElMessage.success('添加成功')
    await SharedCartStore.fetchSharedCartList()

  } catch(err) {
    ElMessage.error('添加失敗')
  }
}

</script>

<template>

  <el-button plain @click="dialogFormVisible = true">
    新增共享購物車
  </el-button>

  <el-dialog v-model="dialogFormVisible" title="新增共享購物車" width="500">
    <el-form :model="form">
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
        <el-button type="primary" @click="createSharedCart">
          新增
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-button.is-plain {
  --el-button-hover-text-color: #000;
  --el-button-hover-bg-color: #343232;
  --el-button-hover-border-color: #000;
}

.el-button:hover {
  border-color: #212121;
  color: #fff;
  outline: none;
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