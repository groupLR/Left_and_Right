<template>
  <hr />
  <!-- Footer -->
  <footer class="w-full bg-white">
    <div class="justify-center grid grid-cols-1 px-10 pt-10 gap-10 md:grid-cols-4 lg:pt-0 lg:m-8 xl:pl-28">
      <!-- COMPANY -->
      <div class="flex flex-col">
        <h3 class="font-extrabold text-sm lg:text-base mb-4">COMPANY</h3>
        <ul class="space-y-2 text-sm">
          <li><router-link to="/about" class="block text-sm">關於我們 About Us</router-link></li>
          <li><router-link to="/store-info" class="block">門市資訊 Store-info</router-link></li>
          <li><router-link to="/vip" class="block">會員優惠 VIP</router-link></li>
          <li><router-link to="/cooperation" class="block">異業合作 Cooperation</router-link></li>
          <li><router-link to="/franchising" class="block">海外經銷 Franchising</router-link></li>
        </ul>
      </div>

      <!-- SERVICE -->
      <div class="flex flex-col">
        <h3 class="font-extrabold text-sm lg:text-base mb-4">SERVICE</h3>
        <ul class="space-y-2 text-sm">
          <li><router-link to="/how-to-buy" class="block">如何購買 How To Buy</router-link></li>
          <li><router-link to="/packaging" class="block">商品包裝 Packaging</router-link></li>
          <li><router-link to="/after-sales" class="block">售後服務 After-sales service</router-link></li>
          <li><router-link to="/overseas-delivery" class="block">海外運送 Overseas delivery</router-link></li>
        </ul>
      </div>

      <!-- CONTACT US -->
      <div class="flex flex-col">
        <h3 class="font-extrabold text-sm lg:text-base mb-4">CONTACT US</h3>
        <p class="text-sm">免付費電話 / 0800 000 004</p>
        <p class="text-sm lg:mb-4">MON - FRI / 9:00 am - 18:00 pm</p>
        <div class="flex space-x-4">
          <a href="#" target="_blank">
            <img class="w-10" src="https://img.shoplineapp.com/media/image_clips/5eb0e9af1f1d01002a3dfaf7/original.png?1588652463" alt="" />
          </a>
          <a href="#" target="_blank">
            <img class="w-10" src="https://img.shoplineapp.com/media/image_clips/5eb0e8f8d4a797001baa024e/original.png?1588652280" alt="" />
          </a>
        </div>
      </div>

      <!-- FOLLOW US -->
      <div class="flex flex-col">
        <h3 class="font-extrabold text-sm lg:text-base lg:mb-4">FOLLOW US</h3>
        <div class="flex space-x-4">
          <a href="#" target="_blank">
            <img class="w-10" src="https://img.shoplineapp.com/media/image_clips/5e9d72cff915300015059501/original.png?1587376847" alt="Facebook" />
          </a>
          <a href="#" target="_blank">
            <img class="w-10" src="https://img.shoplineapp.com/media/image_clips/5e9d72cf9546400021f6f837/original.png?1587376847" alt="Instagram" />
          </a>
        </div>
      </div>
    </div>

    <!-- Footer Bottom Section -->
    <div class="px-2 font-xs text-white bg-[#314e86] xl:bg-[#C9D9F0] xl:text-black xl:opacity-700 py-4 mt-5 text-center">
      <p class="text-xs lg:text-sm font-semibold">2025 © LEFT & RIGHT CO. LTD. ALL RIGHTS RESERVED.</p>
      <p class="text-xs lg:text-sm">營業人名稱：L&R股份有限公司</p>
    </div>
  </footer>
</template>
