import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useTranslatorStore = defineStore("translator", () => {
  const selectedLanguage = ref({
    code: "ja",
    name: "日本語",
  })
  const languages = ref([
    { code: "zh-TW", name: "繁體中文" },
    { code: "en", name: "English" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "zh-CN", name: "简体中文" },
  ])
  const isInitialized = ref(false)

  const setLanguage = (language) => {
    selectedLanguage.value = language
    translateTo(language.code)
  }

  const initGoogleTranslate = () => {
    if (isInitialized.value) return

    // 創建 script 標籤
    const script = document.createElement("script")
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    script.async = true
    document.body.appendChild(script)

    // 定義初始化函數
    window.googleTranslateElementInit = () => {
      console.log("Google Translate initialized")
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "zh-TW",
          includedLanguages: languages.value.map((lang) => lang.code).join(","),
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      )
      isInitialized.value = true
    }
    const checkInitialization = () => {
      if (isInitialized.value) {
        console.log("Google Translate is ready") // 調試用
        return
      }
      setTimeout(checkInitialization, 100) // 遞歸檢查
    }
    checkInitialization()
  }

  const translateTo = (languageCode) => {
    const frame = document.getElementsByClassName("goog-te-menu-frame")[0]
    if (!frame) return

    const items = frame.contentWindow.document.getElementsByClassName("goog-te-menu2-item")
    for (let item of items) {
      if (item.innerHTML.includes(languageCode)) {
        item.click()
        break
      }
    }
  }

  const addLanguage = (code, name) => {
    languages.value.push({ code, name })
  }

  const removeLanguage = (code) => {
    const index = languages.value.findIndex((lang) => lang.code === code)
    if (index !== -1) {
      languages.value.splice(index, 1)
    }
  }

  const currentLanguage = () => computed(() => selectedLanguage.value)
  const availableLanguages = () => computed(() => languages.value)

  return {
    selectedLanguage,
    languages,
    isInitialized,
    setLanguage,
    initGoogleTranslate,
    translateTo,
    addLanguage,
    removeLanguage,
    currentLanguage,
    availableLanguages,
  }
})
