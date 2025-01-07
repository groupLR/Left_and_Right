<script setup>
import { ref } from "vue"
import { RouterLink, useRoute, useRouter } from "vue-router"
import Logout from "./Logout.vue"

const route = useRoute()
const router = useRouter()

const navbarOption = ref([
  {
    text: "個人資訊",
    router: "/users/edit",
  },
  {
    text: "優惠券",
    router: "/MemberCoupons",
  },
  {
    text: "訊息",
    router: "/MemberMessage",
  },
  {
    text: "訂單",
    router: "/MemberOrder",
  },
  {
    text: "追蹤清單",
    router: "/MemberWishList",
  },
])
if (route.path === "/") {
  router.push("/users/edit")
}
</script>

<template>
  <Logout />
  <div class="my-0 lg:px-10">
    <div class="lg:max-w-[1358px] lg:mx-auto">
      <!-- nav bar -->
      <nav>
        <ul class="flex p-0 justify-between gap-2 md:gap-0">
          <li
            v-for="(option, index) in navbarOption"
            class="memberOptions transition-all duration-200 text-sm text-[#0f4662] border-[#ddd] border-solid border"
            :key="index"
            :class="{
              'font-bold text-[#0f4662]  bg-white border-b-0 text-[28px] shadow-inner': route.path === option.router,
              'text-gray-500  bg-gray-200/20': route.path !== option.router,
            }"
          >
            <RouterLink :to="option.router" class="block w-full h-full">
              <div>
                {{ option.text }}
              </div>
            </RouterLink>
          </li>
        </ul>
      </nav>
      <!-- nav bar -->
    </div>
  </div>
</template>

<style scoped>
/* * {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333333;
} */

/* nav bar */

.memberOptions {
  width: 100%;
  max-width: 100%;
  list-style-type: none;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.memberOptions:hover {
  cursor: pointer;
  font-weight: 700;
}
@media (max-width: 768px) {
  /* nav bar */
  .memberNavbar {
    display: flex;
    background-color: #fff;
    padding: 0;
    margin: auto;
    max-width: 80%;
    overflow-x: auto; /* 開啟水平捲動 */
  }
  .memberOptions {
    min-width: 50px;
    list-style-type: none;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #33333399;
    /* border-left: none; */
    /* border-bottom: solid 1px #ddd; */
    /* border-top: none; */
    white-space: nowrap;
    /* background-color: #fff; */
  }
  .memberOptions:first-of-type {
    border-left: none;
  }
  /* nav bar */
}
</style>
