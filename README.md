# Left_and_Right

這是 Left & Right 電商網站的前端專案。使用 Vue.js 3 開發，採用 Vite 作為建構工具，提供現代化的使用者介面與互動體驗。

- [Left & Right 網站](https://left-and-right-accessory.up.railway.app/)
- [Left & Right 後端專案](https://github.com/groupLR/Left_and_Rignt_Backend.git)

## 系統架構

- **框架**：Vue.js 3.4.15
- **建構工具**：Vite 5.4.10
- **狀態管理**：Pinia 2.2.6
- **路由管理**：Vue Router 4.4.5
- **UI 框架**：Element Plus 2.8.8
- **CSS 框架**：Tailwind CSS 3.4.15
- **主要套件**：
  - axios：HTTP 請求客戶端
  - jwt-decode：JWT 解碼工具
  - swiper：輪播功能
  - vue-awesome-paginate：分頁元件
  - vue3-danmaku：彈幕功能
  - @fortawesome：圖標套件
  - zod：資料驗證

## 主要功能

- 會員系統
  - 一般登入/註冊
  - Google OAuth 登入
  - 會員資料管理
- 商品瀏覽
  - 商品搜尋
  - 商品分類
  - 商品篩選
  - 商品排序
- 購物車系統
  - 一般購物車
  - 共享購物車（WebSocket 即時同步）
- 結帳流程

  - 金流串接
  - 優惠券套用
  - 匯率轉換

  ## 團隊成員

### 方玟蓉

- **GitHub**: [Fang-33](https://github.com/Fang-33)
- **Email**: 33justworkplace@gmail.com
- **負責功能**：
  - Google OAuth 登入整合
  - 共享購物車功能開發
  - 商品列表（分頁、篩選、排序）
  - 聯名商品功能
  - 購物車重構
  - 商品與共享購物車資料庫設計

### 陳瑩軒

- **GitHub**: [U0914015](https://github.com/U0914015)
- **Email**: lily414016@gmail.com
- **負責功能**：
  - 購物車功能
  - 結帳流程實作
  - 購物車與結帳相關 API 開發
  - 交易相關資料庫設計

### 陳予晴

- **GitHub**: [Cloverche](https://github.com/Cloverche)
- **Email**: Sunny40224@gmail.com
- **負責功能**：
  - 會員系統開發
  - 商品詳情功能
  - 匯率轉換功能
  - 導覽列功能
  - 使用者資料庫設計

### 楊頌偉

- **GitHub**: [rocksypig](https://github.com/rocksypig)
- **Email**: rocksypig@gmail.com
- **負責功能**：
  - 訂單管理系統
  - 商品追蹤功能
  - 商品評論系統
  - 評論資料庫設計

### 陳心妍

- **GitHub**: [CHENPODO](https://github.com/CHENPODO)
- **Email**: podoyo23@gmail.com
- **負責功能**：
  - 商品搜尋功能
  - 優惠券系統
  - 前端頁尾開發

### 張翰浥

- **GitHub**: [Chang-Han-Yi](https://github.com/Chang-Han-Yi)
- **Email**: tommy890220@gmail.com
- **負責功能**：
  - 導覽列切版
  - 側邊欄功能
  - 會員資料整合

### 李沁騰

- **GitHub**: [leonli8731](https://github.com/leonli8731)
- **Email**: 6011212@gmail.com
- **負責功能**：
  - 首頁輪播功能
  - 分店資訊系統
  - 結帳介面開發

## 系統需求

- Node.js 16.x 以上
- npm 8.x 以上
- 現代瀏覽器支援

## 開始使用

1. 克隆專案

```bash
git clone https://github.com/groupLR/Left_and_Right.git
cd Left_and_Right
```

2. 安裝依賴

```bash
npm install
```

3. 環境設定
   複製 .env.example 為 .env
   設定環境變數，以下範例：

```markdown
VITE_API_URL=http://localhost:3000
VITE_WEBSOCKET_URL=ws://localhost:3300
```

4. 啟動開發伺服器

```bash
npm run dev
```

5. 建構生產版本

```bash
npm run build
```

6.部署

本專案使用 Railway 進行部署。

Railway 部署步驟：

1. 連接 GitHub 倉庫
2. 選擇要部署的分支
3. 環境變數設定
4. 自動部署

## 授權協議

本專案採用 MIT 授權 - 詳見 LICENSE 檔案

## 聯絡方式

若有任何問題或建議，請聯絡：

### 專案維護者：

- Fang-33
- Email：33justworkplace@gmail.com

## 致謝

感謝所有團隊成員的貢獻與努力。特別感謝:

- Railway 提供的部署服務
- 所有提供技術支援的教師與助教
