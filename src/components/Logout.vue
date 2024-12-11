<script setup>
import { useRouter } from 'vue-router'

const STORAGE_KEY = 'UID'
const STORAGE_JWT_KEY = 'TwT'
const router = useRouter()

const handleLogOut = ()=>{
  //移除localstorage
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(STORAGE_JWT_KEY)
  //導向首頁
  router.push({
    name:'home'
  })
  console.log("登出成功");
}


</script>
<template>
  <div class="signOutArea">
        <p class="signOut text-sm hover:cursor-pointer" @click="handleLogOut">登出</p>
    </div>
</template>
<style scoped>
    .signOutArea{
        display: flex;
        margin: 0 auto;
        justify-content: start;
        max-width: 1400px;
        width: 100%;
        padding: 22px;
    }
    .signOut{
        color: black;
        text-decoration-line: underline;
    }
    @media screen and (width <= 1024px) {
        .signOutArea{
            width: 90%;
        }
    }
</style>