<template>
    <div>
      <navbar/>
    </div>
</template>

<script setup>
import navbar from '~/components/navbar/navbar.vue';
const userInfo = useNuxtData('userInfo');
import { googleAuthCodeLogin  } from 'vue3-google-login'

const runtimeConfig = useRuntimeConfig()
const { googleClientId: GOOGLE_CLIENT_ID } = runtimeConfig.public


const handleGoogleLogin = async () => {
  const authCode = await googleAuthCodeLogin({
    clientId: GOOGLE_CLIENT_ID
  }).then((response) => {console.log(response); return response?.code})
  if (!authCode) {
    console.warn('登入失敗'); 
  }

  const { data } = await useFetch('/api/auth/google/oauth', {
    method: 'POST',
    body: {
        authCode
    },
    initialCache: false
  })

  userInfo.value = data.value
}
</script>