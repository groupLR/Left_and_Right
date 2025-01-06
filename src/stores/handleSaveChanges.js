import { useUsersInformation } from "/src/stores/memberInformation.js"
import { useDeliverInfo } from "/src/stores/recipientInfo"

export const handleSaveChanges = (information, deliverInfo) => {
  const { updateInformation } = useUsersInformation()
  const { updateDeliverInfo } = useDeliverInfo()

  try {
    updateInformation(information)
    updateDeliverInfo(deliverInfo)
  } catch (error) {
    console.error("更新資料時發生錯誤：", error)
  }
}
