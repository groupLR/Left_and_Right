class WebSocketService {
  constructor() {
    // WebSocket 實例
    this.ws = null
    // 連接狀態
    this.isConnected = false
    // 消息處理函數映射
    this.messageHandlers = new Map()
  }

  // 建立 WebSocket 連接
  connect() {
    // 創建 WebSocket 連接
    this.ws = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}`)

    // 連接成功事件
    this.ws.onopen = () => {
      this.isConnected = true
    }

    // 接收消息事件
    this.ws.onmessage = (event) => {
      try {
        // 解析接收到的 JSON 消息
        const data = JSON.parse(event.data)

        // 根據消息類型查找對應的處理函數
        const handler = this.messageHandlers.get(data.type)

        if (handler) {
          // 執行對應的處理函數
          handler(data)
        } else {
          // 未找到處理函數時的備選處理
          console.warn(`未找到 ${data.type} 類型的處理函數`)
        }
      } catch (error) {
        // 捕獲並記錄解析錯誤
        console.error("解析消息失敗:", error)
      }
    }

    // 連接關閉事件
    this.ws.onclose = () => {
      this.isConnected = false
    }

    // 連接錯誤的事件
    this.ws.onerror = (error) => {
      console.error("WebSocket 連接錯誤:", error)
      this.isConnected = false
    }
  }

  // 註冊消息處理函數
  onMessage(type, handler) {
    this.messageHandlers.set(type, handler)
  }

  // 發送消息
  sendMessage(type, data) {
    // 檢查 WebSocket 連接狀態
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error("WebSocket 未連接，無法發送消息")
      return
    }

    try {
      // 將消息轉換為 JSON 字串
      const message = JSON.stringify({
        type,
        data,
      })

      // 發送消息
      this.ws.send(message)
    } catch (error) {
      console.error("發送消息失敗:", error)
    }
  }

  // 斷開 WebSocket 連接
  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
      this.isConnected = false
    }
  }
}

export const webSocketService = new WebSocketService()
