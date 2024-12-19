import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"

export const useSharedCartStore = defineStore("sharedCart", () => {
  const sharedCartList = ref([])
  // 取得共享購物車列表
  const fetchSharedCartList = async (userId) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/sharedCartList`)
      sharedCartList.value = data.sharedCartList
    } catch (err) {
      console.error("Error fetching shared cart list:", err)
    }
  }
  // 取得所有使用者的 email 陣列
  const userEmailList = ref([])
  const getAllUserEmail = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/email`)
      userEmailList.value = data
    } catch (err) {
      console.log("err", err.message)
    }
  }

  // 獲取共享購物車商品
  const fetchSharedCartItems = async (groupId) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/sharedCartItem/${groupId}`)
      return data
    } catch (err) {
      console.log("err", err)
    }
  }

  // 創建共享購物車
  const creatSharedCart = async (name, creatorUID, memberEmail) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/sharedCart`,
        {
          sharedCartName: name || null,
          creatorUID,
          memberEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      return data
    } catch (err) {
      console.log("create err:", err)
      throw err
    }
  }
  // 刪除共享購物車
  const deleteSharedCart = async (groupId) => {
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteSharedCart/${groupId}`)
      return data
    } catch (err) {
      console.log(err.message)
    }
  }

  return {
    sharedCartList,
    fetchSharedCartList,
    userEmailList,
    getAllUserEmail,
    fetchSharedCartItems,
    creatSharedCart,
    deleteSharedCart,
  }
})
