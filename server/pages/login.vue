<script setup>
import { googleAuthCodeLogin  } from 'vue3-google-login'
import AppData from './AppData';

const nuxtApp = useNuxtApp()
const runtimeConfig = useRuntimeConfig()
const { googleClientId: GOOGLE_CLIENT_ID } = runtimeConfig.public;
const handleGoogleLogin = async () => {
  const authCode = await googleAuthCodeLogin({
    clientId: GOOGLE_CLIENT_ID
  }).then((response) => response?.code)
  if (!authCode) {
    console.warn('登入失敗');
    return;
  }

  const { data } = await useFetch('/api/auth/google/oauth', {
    method: 'POST',
    body: {
        authCode
    },
    initialCache: false
  })
  AppData.getInstance().userInfo.email = data.value.email;
  AppData.getInstance().userInfo.name = data.value.name;
  useRouter().replace(useRoute().query['redirect_uri']);
}
</script>
<template>
    <div class="wrapper">
        <button type="button" @click="handleGoogleLogin">
            使用 Google 繼續
        </button>
    </div>
</template>

<style scoped>
.wrapper{
    width: 100dvw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>