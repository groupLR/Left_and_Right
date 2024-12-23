<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(["update:modelValue", "remove"])
</script>

<template>
  <el-form-item label="好友信箱 *">
    <el-input autocomplete="off" placeholder="example@example.com" :model-value="modelValue" @update:modelValue="emit('update:modelValue', $event)" />
    <!-- 刪除按鈕 -->
    <button class="ml-2" @click="emit('remove')"><i class="fa-solid fa-trash"></i></button>
  </el-form-item>
</template>

<style scoped>
:deep(.el-form-item__content) {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
</style>
