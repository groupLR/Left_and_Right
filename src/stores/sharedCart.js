import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"

export const useSharedCartStore = defineStore("sharedCart", () => {
  const sharedCartList = ref([])
  // 取得共享購物車列表
  const fetchSharedCartList = async (userId) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/sharedCartList`, {
        headers: {
          "Content-Type": "application/json",
          userId,
        },
      })
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
    const userId = localStorage.getItem("UID")
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/sharedCartItem/${groupId}`, {
        headers: {
          userId,
        },
      })
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

  // 新增好友到共享購物車
  const addMemberToSharedCart = async (groupId, memberEmails) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/addMemberToSharedCart`,
        {
          groupId,
          memberEmails,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      return data
    } catch (err) {
      console.log(err.message)
    }
  }

  // 將商品新增到共享購物車
  const addProductToSharedCart = async (groupId, productId, quantity = 1) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/sharedCart/addProduct/${groupId}`, {
        productId,
        quantity,
      })
      return data
    } catch (err) {
      console.error("添加商品到共享購物車失敗:", err)
      throw err
    }
  }

  // 更新購物車內的商品數量
  const updateProductQtyToSharedCart = async (groupId, productId, totalQty) => {
    try {
      const { data } = axios.put(`${import.meta.env.VITE_API_URL}/sharedCart/updateProductQty/${groupId}`, {
        productId,
        totalQty,
      })
      return data
    } catch (err) {
      console.log("更新共享購物車商品數量失敗", err)
      throw err
    }
  }

  // 刪除共享購物車內的商品
  const deleteProductInSharedCart = async (groupId, productId) => {
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/sharedCart/deleteProduct/${groupId}`, {
        data: {
          productId,
        },
      })
      return data
    } catch (err) {
      console.log("刪除共享購物車商品失敗", err)
      throw err
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
    addMemberToSharedCart,
    addProductToSharedCart,
    updateProductQtyToSharedCart,
    deleteProductInSharedCart,
  }
})
