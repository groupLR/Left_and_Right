<script>
export default {
  name: 'GoogleSignInButton',
  props: {
    width: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: null
    }
  },
  mounted() {
    //建立google第三方登入的連結
    window.google.accounts.id.initialize({
      client_id: "201131820318-om98jaudikrjuraavdmt8o0jlitaf7b1.apps.googleusercontent.com",
      callback: this.handleCredentialResponse
    });
    //建立登入按鈕
    window.google.accounts.id.renderButton(
      document.getElementById("google-sign-in-button"),
      {
        theme: "outline",
        size: "large",
        shape: "pill",
      }
    );
  },
  methods: {
    //這個function是要將拿到的User資料(Base64)轉成js的物件型態方便取用
    parseJwt(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    },
    // 取得User資料
    handleCredentialResponse(response) {
      const data = this.parseJwt(response.credential);
      console.log(data)
    },
  }
};
</script>

<template>
  <div style="display: flex;justify-content: center;">
    <div id="google-sign-in-button"></div>
  </div>
</template>