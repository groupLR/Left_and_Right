<script setup>
const teamMembers = [
  {
    name: "方玟蓉",
    github: "Fang-33",
    email: "33justworkplace@gmail.com",
    image: "/wen.png",
    tasks: ["Google OAuth 登入整合", "共享購物車功能開發", "商品列表（分頁、篩選、排序）", "聯名商品功能", "購物車重構", "商品與共享購物車資料庫設計"],
  },
  {
    name: "陳瑩軒",
    github: "U0914015",
    email: "lily414016@gmail.com",
    image: "/ying.png",
    tasks: ["購物車功能", "結帳流程實作", "購物車與結帳相關 API 開發", "交易相關資料庫設計"],
  },
  {
    name: "陳予晴",
    github: "Cloverche",
    email: "Sunny40224@gmail.com",
    image: "/sunny.png",
    tasks: ["會員系統開發", "商品詳情功能", "匯率轉換功能", "導覽列功能", "使用者資料庫設計"],
  },
  {
    name: "楊頌偉",
    github: "rocksypig",
    email: "rocksypig@gmail.com",
    image: "/ding.png",
    tasks: ["訂單管理系統", "商品追蹤功能", "商品評論系統", "評論資料庫設計"],
  },
  {
    name: "陳心妍",
    github: "CHENPODO",
    email: "podoyo23@gmail.com",
    image: "/yan.png",
    tasks: ["商品搜尋功能", "優惠券系統", "前端頁尾開發"],
  },
  {
    name: "張翰浥",
    github: "Chang-Han-Yi",
    email: "tommy890220@gmail.com",
    image: "/tommy.png",
    tasks: ["導覽列切版", "側邊欄功能", "會員資料整合"],
  },
  {
    name: "李沁騰",
    github: "leonli8731",
    email: "6011212@gmail.com",
    image: "/leon.png",
    tasks: ["首頁輪播功能", "分店資訊系統", "結帳介面開發"],
  },
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- 專案介紹 -->
    <section class="mb-12">
      <h1 class="text-3xl font-bold mb-4 text-center">Left & Right</h1>

      <div class="text-center mb-6">
        <p class="text-gray-700">這是 Left & Right 電商網站的前端專案。使用 Vue.js 3 開發，採用 Vite 作為建構工具，提供現代化的使用者介面與互動體驗。</p>
      </div>

      <div class="flex justify-center gap-4 flex-row md:flex-row">
        <a href="https://github.com/groupLR/Left_and_Right.git" target="_blank" class="bg-[#0f4662] text-white px-4 py-1.5 rounded text-sm hover:opacity-90">
          前端專案
        </a>
        <a
          href="https://github.com/groupLR/Left_and_Rignt_Backend.git"
          target="_blank"
          class="bg-gray-700 text-white px-4 py-1.5 rounded text-sm hover:opacity-90"
        >
          後端專案
        </a>
      </div>
    </section>

    <!-- 致敬與版權聲明 -->
    <section class="mb-12">
      <div class="bg-gray-50 rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">致敬</h2>
        <p class="mb-6 text-gray-600 leading-relaxed">
          本專案的設計與功能參考了 Bonny & Read 官方網站，純粹作為學習用途，幫助我們提升前端開發與架構設計的能力。
          特別感謝原網站提供的靈感與參考資料，對我們的設計與學習過程帶來了重要的啟發。
        </p>

        <h2 class="text-2xl font-semibold mb-4">版權聲明</h2>
        <p class="text-gray-600 leading-relaxed">圖片版權歸 Bonny & Read 團隊所有，本專案僅作為學習用途，未經授權不得商業使用或再分發。</p>
      </div>
    </section>

    <!-- 團隊成員 -->
    <section>
      <h2 class="text-3xl font-bold mb-12 text-center">團隊成員</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- 成員卡片 -->
        <div
          v-for="member in teamMembers"
          :key="member.name"
          class="team-member-card bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300"
        >
          <!-- 成員照片 -->
          <div class="flex justify-center mb-4">
            <div class="relative w-32 h-32">
              <img :src="member.image" :alt="member.name" class="w-full h-full object-cover rounded-full border-4" />
            </div>
          </div>

          <!-- 成員資訊 -->
          <div class="text-center mb-4">
            <h3 class="text-xl font-bold text-[#0f4662] mb-2">{{ member.name }}</h3>
            <div class="space-y-1">
              <a
                :href="'https://github.com/' + member.github"
                target="_blank"
                class="text-gray-700 hover:text-[#0f4662] inline-flex items-center gap-2 justify-center"
              >
                <i class="fab fa-github"></i>
                {{ member.github }}
              </a>
              <div class="text-gray-600 inline-flex items-center gap-2 justify-center w-full">
                <i class="fas fa-envelope"></i>
                {{ member.email }}
              </div>
            </div>
          </div>

          <!-- 負責功能 -->
          <div class="border-t pt-4">
            <h4 class="font-semibold mb-3 text-gray-800">負責功能</h4>
            <ul class="space-y-2">
              <li v-for="task in member.tasks" :key="task" class="text-gray-600 flex items-start">
                <span class="text-[#0f4662] mr-2">•</span>
                <span class="text-sm">{{ task }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.team-member-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.team-member-card img {
  transition: transform 0.3s ease;
}

.team-member-card:hover img {
  transform: scale(1.05);
}

/* 確保所有卡片高度一致 */
.team-member-card > div:last-child {
  flex-grow: 1;
}
</style>
