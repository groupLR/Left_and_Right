import { useUsersInformation } from "/src/stores/memberInformation.js"
import { useDeliverInfo } from "/src/stores/recipientInfo"

export const handleSaveChanges = (information, deliverInfo) => {
  const { updateInformation } = useUsersInformation()
  const { updateDeliverInfo } = useDeliverInfo()

  try {
    // 更新會員資訊
    updateInformation(information)
    // 更新送貨資訊
    updateDeliverInfo(deliverInfo)
  } catch (error) {
    console.error("更新資料時發生錯誤：", error)
  }
}
