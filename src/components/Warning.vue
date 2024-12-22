# WarningDialog.vue
<script setup>
import { ref } from "vue"

const props = defineProps({
  title: {
    type: String,
    default: "注意",
  },
  content: {
    type: String,
    default: "您確定要執行此操作嗎？",
  },
  confirmText: {
    type: String,
    default: "確認",
  },
  cancelText: {
    type: String,
    default: "取消",
  },
  buttonText: {
    type: String,
    default: "刪除",
  },
  buttonType: {
    type: String,
    default: "danger",
  },
})

const dialogVisible = ref(false)
const emit = defineEmits(["confirm"])

const handleConfirm = () => {
  dialogVisible.value = false
  emit("confirm")
}
</script>

<template>
  <el-button :type="buttonType" plain @click="dialogVisible = true">
    {{ buttonText }}
  </el-button>

  <el-dialog v-model="dialogVisible" :title="title" width="80%" center>
    <span>{{ content }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">
          {{ cancelText }}
        </el-button>
        <el-button type="primary" @click="handleConfirm">
          {{ confirmText }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
