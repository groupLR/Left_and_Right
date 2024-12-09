<script setup lang="ts">
import { onMounted, ref,reactive } from 'vue'
import axios from 'axios'
import { z } from 'zod'
import { useRouter } from 'vue-router';

const router = useRouter()

//控制註冊登入頁面切換
const isLogin = ref(true)
const isRegister = ref(false)
//確定一開始資料為空
const userData = ref(null)
const isLoggedIn = ref(false)  // 登入狀態
// 後端 API 網址
const API_URL = 'http://localhost:3000'
// localStorage 的 key
const STORAGE_KEY = 'UID'
// 錯誤訊息狀態
const errors = ref([])
//轉換註冊選項
const selectedOption = ref('email')
//同意政策才能按下註冊按鈕
const registerAgree = ref(false)


//註冊表單資料
const registerForm = reactive({
    userId:'',
    username:'',
    email:'',
    phone:'',
    password_hash:'',
    gender:'',
    birthdayYear:'',
    birthdayMonth:'',
    birthdayDay:''
})
//註冊資料格式
const registerRule = z.object ({
    username:z.string().max(50,'使用者名稱不能超過50個字元'),
    email:z.string().email('請輸入正確的email'),
    // phone:z.string().length(10,'請輸入正確的手機號碼'),
    password_hash:z.string().min(8,'密碼至少需要8個字元'),
    gender:z.enum(['m','f','o'],{
        errorMap:() => ({message:'請選擇有效性別'})
    }),
})
//登入表單資料
const loginForm = reactive({
    email:'',
    password:''
})

// 轉換頁面方法
const switchToLogin = () => {
  isLogin.value = true
  isRegister.value = false
    
}
const switchToRegister = () =>{
  isRegister.value = true
  isLogin.value = false
}

//註冊
const handleRegister = async () => {
    errors.value = []
    if(registerAgree.value){
        try {
            //zod驗證
            const verifyData = registerRule.parse({
                // userId:registerForm.userId,
                username:registerForm.username,
                email:registerForm.email,
                phone:registerForm.phone,
                password_hash:registerForm.password_hash,
                gender:registerForm.gender
            })
            const response = await axios.post(`${API_URL}/users/register`, verifyData)

            userData.value = response.data.user
            
            //儲存userId在localstorage
            localStorage.setItem(STORAGE_KEY, userData.value.userId) 
            // localStorage.setItem('TWT', response.data.token)
            console.log('註冊成功')
            
            isLoggedIn.value = true // 註冊後直接登入

            //導向首頁
            router.push({
                name:'home'
            })
            

            //確認userId是否儲存成功
            const storedUserId = localStorage.getItem(STORAGE_KEY)
            console.log('Stored User ID:', storedUserId)
            console.log('userId:', userData.value.userId)
            // 可以加入额外验证
            if (storedUserId === userData.value.userId) {
                console.log('User ID 成功儲存')
            }else{
                console.log('User ID 儲存失敗')
            }

            
        } catch (error) {
            // console.error('註冊失敗:',error)
            if (error.response && error.response.status === 409) {
                alert('此電子郵件已被註冊，請使用其他郵箱')
            }
            
            // Zod 驗證錯誤處理
            if (error instanceof z.ZodError) {
                errors.value = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
            } 
            // Axios API 錯誤處理  
            else if (error.response) {
                const apiErrors = error.response.data.details || 
                    [{ message: error.response.data.message || '註冊失敗' }]
                errors.value = apiErrors
            } 
            // 網路或其他錯誤
            else {
                errors.value = [{ 
                    field: 'general', 
                    message: '網路連線錯誤，請稍後再試' 
                }]
            }
        }
    } 
}
// const getErrorMessage = (field) => {
//   const error = errors.value.find(err => err.field === field)
//   return error ? error.message : ''
// }
//登入
const handleLogin = async() =>　{
    try{
        const response = await axios.post(`${API_URL}/users/login`, loginForm)
        
        userData.value = response.data.user
        
        //儲存userId在localstorage
        localStorage.setItem(STORAGE_KEY,userData.value.userId)
        // localStorage.setItem('TWT', response.data.token)

        console.log('登入成功')
        //恭喜登入
        isLoggedIn.value = true

        //導向首頁
        router.push({
            name:'home'
        })

        //確認userId是否儲存成功
        const storedUserId = localStorage.getItem(STORAGE_KEY)
        console.log('Stored User ID:', storedUserId)
        // 可以加入额外验证
        if (storedUserId === userData.value.userId) {
            console.log('User ID 成功儲存')
        }else{
            console.log('User ID 儲存失敗')
        }
    }catch(error){
        if(error.response){
            switch(error.response.status) {
                case 401:
                    alert('帳號或密碼錯誤');
                    break;
                case 500:
                    alert('伺服器錯誤，請稍後再試');
                    console.error('Server Error Details:', error.response.data);
                    break;
                    
                default:
                    alert('登錄失敗');
            }
        }else if(error.request){
            alert('網路連接失敗');
        }else{
            alert('發生未知錯誤')
        }
    }
}


</script>

<template>
    <div class=" border m-5 md:w-full md:max-w-[600px] md:mx-auto md:justify-center  md:flex md:flex-col">
        <img src="../assets/register-pic.jpeg" alt="">
        
        <div class="w-full grid grid-cols-2 text-center leading-[62px]">
            <div class="border hover:cursor-pointer" @click="switchToRegister">註冊會員</div>
            <div class="border hover:cursor-pointer" @click="switchToLogin">會員登入</div>
        </div>
        <!-- 註冊 -->
        <div class="p-5 mx-auto" v-if="isRegister">
            <div class="grid grid-cols-1 justify-between gap-5 px-10 pb-5 lg:grid-cols-2">
                <button class="text-base px-10 border">使用LINE註冊</button>
                <button class="text-base px-10 border">使用Facebook註冊</button>
            </div>
            <form class="informationInput" method="post" id="registerField" @submit.prevent="handleRegister">
                <input type="text" placeholder="用戶名" id="username" class="input" v-model="registerForm.username" autocomplete="username'" required>
                <select v-model="selectedOption">
                    <option value="email">使用Email註冊</option>
                    <option value="phone">使用手機號碼註冊</option>
                </select>
                <div v-if="selectedOption === 'email'" required>
                    <input type="text" placeholder="電子信箱" v-model="registerForm.email" id="email" autocomplete="email" >
                </div>
                <div class="mb-5 w-full grid grid-cols-[1fr_3fr]" v-if="selectedOption === 'phone'" required>
                    <!-- <input type="tel" name="" id="phone" v-model="registerForm.phone" autocomplete="tel"></input> -->
                    <select></select>
                    <input type="number" name="" id="" autocomplete="tel" placeholder="0912 345 678"/>
                </div>
                <div class="password" required>
                    <input type="text" placeholder="密碼" v-model="registerForm.password_hash" id="password" autocomplete="current-password">
                </div>
                <div>
                    <select v-model="registerForm.gender" id="gender" required>
                        <option value="" disabled selected>性別</option>
                        <option value="m">男</option>
                        <option value="f">女</option>
                        <option value="o">不透漏</option>
                    </select>
                <!-- <span class="error-text">{{ getErrorMessage('gender') }}</span> -->
                </div>
                
                <div class="grid grid-cols-3 gap-2.5">
                    <select name="" id="birthdayYear" v-model="registerForm.birthdayYear">
                        <option value=""selected disabled>年</option>
                    </select>
                    <select name="" id="birthdayMonth" v-model="registerForm.birthdayMonth">
                        <option value=""selected disabled>月</option>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                        <option value="">6</option>
                        <option value="">7</option>
                        <option value="">8</option>
                        <option value="">9</option>
                        <option value="">10</option>
                        <option value="">11</option>
                        <option value="">12</option>
                    </select>
                    <select name="" id="birthdayDay" v-model="registerForm.birthdayDay">
                        <option value=""selected disabled>日</option>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                        <option value="">6</option>
                        <option value="">7</option>
                        <option value="">8</option>
                        <option value="">9</option>
                        <option value="">10</option>
                        <option value="">11</option>
                        <option value="">12</option>
                        <option value="">13</option>
                        <option value="">14</option>
                        <option value="">15</option>
                        <option value="">16</option>
                        <option value="">17</option>
                        <option value="">18</option>
                        <option value="">19</option>
                        <option value="">20</option>
                        <option value="">21</option>
                        <option value="">22</option>
                        <option value="">23</option>
                        <option value="">24</option>
                        <option value="">25</option>
                        <option value="">26</option>
                        <option value="">27</option>
                        <option value="">28</option>
                        <option value="">29</option>
                        <option value="">30</option>
                        <option value="">31</option>
                    </select>
                </div>
                <div>
                    <input type="checkbox" name="" id="" checked >我願意接收 Bonny & Read 飾品 的最新消息、優惠及服務推廣相關資訊
                </div>
                <div class="mt-2.5 no-underline borderTop">
                    <input type="checkbox" class="agreeCheck" id="policy" v-model="registerAgree">
                    <label>
                        我同意網站<a href="https://www.bonnyread.com.tw/about/terms" class="text-blue-500">服務條款</a>及<a href="https://www.bonnyread.com.tw/about/privacy-policy" class="text-blue-500">隱私權政策</a>
                    </label>
                    <button type="submit" class="join" :disabled="!registerAgree" >立即加入</button>
                </div>
            </form>
            
        </div>
        <!-- 登入 -->
        <div class="p-5" v-if="isLogin">
            <div class="grid grid-cols-1 justify-between gap-5 px-10 pb-5 lg:grid-cols-2">
                <button class="text-base px-10 border">使用LINE登入</button>
                <button class="text-base px-10 border">使用Facebook登入</button>
            </div>
            <form class="informationInput" @submit.prevent="handleLogin">
                <div class="emailRegister ">
                    <input type="text" placeholder="電子信箱" v-model="loginForm.email" required autocomplete="email">
                </div>
                
                <div class="password">
                    <input type="text" placeholder="密碼" v-model="loginForm.password" required autocomplete="password">
                </div>
                <div class="mt-5 grid grid-cols-1 justify-between gap-5 text-sm">
                    <button class="w-full p-2 bg-[#3493FB] border-0 rounded-md text-white font-extrabold hover:bg-[#6ab0fb] hover:cursor-pointer" type="submit">開始購物</button>
                    <a class="mx-auto cursor-pointer text-[#6D7175] no-underline" href="https://www.bonnyread.com.tw/users/password/new">忘記密碼?</a>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}
.border{
    border: 1px solid #EEEEEE;
}
.borderTop{
    border-top: 1px solid #EEEEEE;
    padding-top: 20px;
}
.informationInput{
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr;
}
.informationInput input[type="text"],.informationInput input[type="number"],.informationInput input[type="tel"],.informationInput select{
    margin-bottom:20px ;
    height: 42px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #EEEEEE;
    padding-left: 15px;
}
.informationInput input[type="text"]:focus,.informationInput input[type="number"]:focus,.informationInput select:focus,.informationInput input[type="tel"]:focus{
    border: 1px solid #EEEEEE;
    outline: none;
}
.password{
    position: relative;
    margin-bottom: 10px;
}
.password::after{
    content: "至少8個字元";
    position: absolute;
    color: rgb(150, 150, 150);
    left: 0;
    top:45px;
    font-size: 12px;
}
.join{
    width: 100%;
    margin-top: 20px;
    padding: 10px;
    background-color: #7BB9FC;
    border: 0;
    border-radius: 5px;
    color: white;
    font-weight: 1000;
    font-size: 14px;
    cursor: auto;
}
.join:hover{
    background-color: #6ab0fb;
}

.agreeCheck:checked ~ .join{
    background-color: #3493FB;
    cursor: pointer;
}
</style>