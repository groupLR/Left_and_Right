<script setup>
const handleSignOut = ()=>{
  //導向首頁
  router.push({
    name:'home'
  })
}


</script>
<template>
  <div class="sign-out-area">
        <p class="sign-out text-sm hover:cursor-pointer" @click="signOut">登出</p>
    </div>
</template>
<style scoped>
    .sign-out-area{
        display: flex;
        margin: 0 auto;
        justify-content: start;
        max-width: 1400px;
        width: 100%;
        padding: 22px;
    }
    .sign-out{
        color: black;
        text-decoration-line: underline;
    }
    @media screen and (width <= 1024px) {
        .sign-out-area{
            width: 90%;
        }
    }
</style>