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
    <div class="flex">
      <el-input autocomplete="off" placeholder="example@example.com" :model-value="modelValue" @update:modelValue="emit('update:modelValue', $event)" />
      <button @click="emit('remove')">刪</button>
    </div>
  </el-form-item>
</template>
