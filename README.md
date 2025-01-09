# Left_and_Right

這是 Left & Right 電商網站的前端專案。使用 Vue.js 3 開發，採用 Vite 作為建構工具，提供現代化的使用者介面與互動體驗。

- [Left & Right 網站](https://left-and-right-accessory.up.railway.app/)
- [Left & Right 後端專案](https://github.com/groupLR/Left_and_Rignt_Backend.git)

# 致敬

本專案的設計與功能參考了 Bonny & Read 官方網站，純粹作為學習用途，幫助我們提升前端開發與架構設計的能力。特別感謝原網站提供的靈感與參考資料，對我們的設計與學習過程帶來了重要的啟發。

# 版權聲明

圖片版權歸 Bonny & Read 團隊所有，本專案僅作為學習用途，未經授權不得商業使用或再分發。

## 系統架構

- **框架**：Vue3
- **建構工具**：Vite
- **狀態管理**：Pinia
- **路由管理**：Vue Router
- **UI 框架**：Element Plus
- **CSS 框架**：Tailwind CSS

## 主要功能

- 會員系統
  - 一般登入/註冊
  - Google OAuth 登入
  - 會員資料管理
- 商品瀏覽
  - 商品搜尋、分類、篩選、排序
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
  - UI 介面整合

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
  - 會員資料

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
   複製 `.env.example` 檔案為 `.env`，以便為專案設定環境變數

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
