import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from 'axios';

export const useProductDetail = defineStore('products',() => {
  const API_URL = 'http://localhost:3300'

  const profile = ref('')
  const mainImgs = ref([])
  const desImgs = ref([])
  const fetchProductDetail = async(product_id = 35) =>{
    try{
      const response = await axios.get(`${API_URL}/products/${product_id}`)
      profile.value = response.data.profile
      mainImgs.value = response.data.mainImgs.map((img, index) => ({
        imgPath: img.image_path,
        imgText:img.alt_text,
        colorText: response.data.specs[index]?.color_text || null,
        colorSquare: response.data.specs[index]?.color_square || null
      }))
      desImgs.value = response.data.desImgs.map(img => img.image_path)
      console.log(profile.value);
      
    }catch(err){
      console.error('獲取商品詳情失敗:', err)
    }
  }

  return{
    profile,
    mainImgs,
    desImgs,
    fetchProductDetail
  }
})