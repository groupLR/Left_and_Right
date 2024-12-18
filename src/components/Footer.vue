<template>
  <hr />
  <footer class=" w-full bg-white mt-8">
    <div class="m-auto pb-3 mx-auto grid grid-cols-1 md:grid-cols-4 p-5 gap-8 mb-20 lg:m-8">
      <!-- COMPANY -->
      <div class="flex flex-col ">
        <h3 class="font-extrabold text-[18px] mb-4">COMPANY</h3>
        <ul class="space-y-2">
          <li><router-link to="/about" class="block">關於品牌 About Us</router-link></li>
          <li><router-link to="/store-info" class="block">門市資訊 Store-info</router-link></li>
          <li><router-link to="/vip" class="block">會員優惠 VIP</router-link></li>
          <li><router-link to="/blog" class="block">潮流趨勢 BLOG</router-link></li>
          <li><router-link to="/cooperation" class="block">異業合作 Cooperation</router-link></li>
          <li><router-link to="/franchising" class="block">海外經銷 Franchising</router-link></li>
        </ul>
      </div>

      <!-- SERVICE -->
      <div class="flex flex-col">
        <h3 class="font-extrabold text-[18px] mb-4">SERVICE</h3>
        <ul class="space-y-2">
          <li><router-link to="/how-to-buy" class="block">如何購買 How To Buy</router-link></li>
          <li><router-link to="/packaging" class="block">商品包裝 Packaging</router-link></li>
          <li><router-link to="/after-sales" class="block">售後服務 After-sales service</router-link></li>
          <li><router-link to="/overseas-delivery" class="block">海外運送 Overseas delivery</router-link></li>
          <li><router-link to="/faq" class="block">常見問題 FAQ</router-link></li>
          <li><router-link to="/redeem-gift" class="block">點數兌換 Redeem Gift</router-link></li>
          <li><router-link to="/maintenance" class="block">飾品保養 Maintenance</router-link></li>
          <li><router-link to="/privacy" class="block">隱私權政策 Privacy</router-link></li>
        </ul>
      </div>

      <!-- CONTACT US -->
      <div class="flex flex-col">
        <h3 class="font-extrabold text-[18px] mb-4">CONTACT US</h3>
        <p class="text-sm">免付費電話 / 0800 000 004</p>
        <p class="text-sm mb-4">MON - FRI / 9:00 am - 18:00 pm</p>
        <div class="flex space-x-4">
          <a href="https://github.com/33test">
            <img class="w-10" src="https://img.shoplineapp.com/media/image_clips/5eb0e9af1f1d01002a3dfaf7/original.png?1588652463" alt="">
          </a>
          <a href="https://github.com/33test">
            <img class="w-10" src="https://img.shoplineapp.com/media/image_clips/5eb0e8f8d4a797001baa024e/original.png?1588652280" alt="">
          </a>
        </div>
      </div>

      <!-- FOLLOW US -->
      <div class="flex flex-col ">
        <h3 class="font-extrabold text-[18px] mb-4">FOLLOW US</h3>
        <div class="flex space-x-4">
          <a href="https://github.com/33test">
          </a>
          <a href="https://github.com/33test">
            <img class="w-10" src="https://img.shoplineapp.com/media/image_clips/5e9d72cf9546400021f6f837/original.png?1587376847" alt="Instagram">
          </a>
        </div>
      </div>
    </div>

    <!-- Footer Bottom Section -->
    <div class=" text-xs bg-gray-200 py-4 text-center">
      <p class="text-sm font-semibold">2024 ©LEFT RIGHT .</p>
      <p class="text-sm">營業人名稱：L&R股份有限公司/ 統一編號：1234678</p>
    </div>
  </footer>
</template>