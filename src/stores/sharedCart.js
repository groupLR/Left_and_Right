import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"

export const useSharedCartStore = defineStore("sharedCart", () => {
  const sharedCartList = ref([])

  const fetchSharedCartList = async (userId) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/sharedCartList`)
      sharedCartList.value = data.sharedCartList
    } catch (err) {
      console.error("Error fetching shared cart list:", err)
    }
  }

  const userEmailList = ref([])
  const getAllUserEmail = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/email`)
      userEmailList.value = data
    } catch (err) {
      console.log("err", err)
    }
  }

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

  return {
    sharedCartList,
    fetchSharedCartList,
    userEmailList,
    getAllUserEmail,
    creatSharedCart,
  }
})
