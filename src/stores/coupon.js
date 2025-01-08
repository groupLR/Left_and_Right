import axios from "axios"

export const COUPONS = [
  { name: "情人節優惠", minSpend: 200.0, discountAmount: 60.0, startDate: 1731032836000, endDate: 1794104836000 },
  { name: "海外運送優惠券", minSpend: 2999.0, discountAmount: 60.0, startDate: 1731032836000, endDate: 1794104836000 },
  { name: "黑五優惠", minSpend: 1600.0, discountAmount: 160.0, startDate: 1731032836000, endDate: 1794104836000 },
  { name: "新年優惠", minSpend: 500.0, discountAmount: 200.0, startDate: 1731032836000, endDate: 1794104836000 },
]

export const addWelcomeCoupons = async (userId) => {
  try {
    const addCouponPromises = COUPONS.map((coupon) =>
      axios.post(`${import.meta.env.VITE_API_URL}/coupon/${userId}`, {
        name: coupon.name,
        minSpend: coupon.minSpend,
        discountAmount: coupon.discountAmount,
        startDate: coupon.startDate,
        endDate: coupon.endDate,
      })
    )

    await Promise.all(addCouponPromises)
    return true
  } catch (error) {
    console.error("新增優惠券失敗:", error)
    return false
  }
}

export default COUPONS
