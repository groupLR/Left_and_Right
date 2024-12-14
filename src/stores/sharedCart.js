import { defineStore } from "pinia";
import { ref } from "vue";
import axios from 'axios';

export const useSharedCartStore = defineStore('sharedCart', () => {
  const API_URL = 'http://localhost:3300'

const sharedCartList = ref([])

const fetchSharedCartList =  async(userId) => {
  try {
    const {data} = await axios.get(`${API_URL}/sharedCartList`)
    sharedCartList.value = data.sharedCartList

  }catch (err){
    console.error('Error fetching shared cart list:', err)
  }
}

return {
  sharedCartList,
  fetchSharedCartList
}
})