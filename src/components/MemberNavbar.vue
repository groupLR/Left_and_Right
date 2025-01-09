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
  <div class="mx-3 lg:mx-0">
    <Logout />
    <div class="my-0 lg:px-10">
      <div class="md:max-w-[1358px] md:mx-auto">
        <!-- nav bar -->
        <nav>
          <ul class="flex p-0 justify-between gap-2 md:gap-0">
            <li
              v-for="(option, index) in navbarOption"
              class="memberOptions transition-all duration-200 text-base text-[#314e86] border-[#ddd] border-solid border rounded-t-lg"
              :key="index"
              :class="{
                'font-bold text-white  bg-[#314e86] border-b-0 text-[28px] shadow-inner': route.path === option.router,
                'text-[#314e86]  bg-gray-100': route.path !== option.router,
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
  </div>
</template>

<style scoped>
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
    min-width: 62px;
    list-style-type: none;
    height: 45px;
    line-height: 45px;
    text-align: center;
    white-space: nowrap;
    font-size: 14px;
  }
}
</style>
