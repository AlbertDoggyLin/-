export default defineNuxtRouteMiddleware(async (from, to) => {
    try{
        const google_access_token = useCookie('google_access_token');
        const res = await useFetch('/api/auth/google/get_user', {
            method: 'POST',
            body: {
                access_token: google_access_token
            }
          });
          if(res.status.value=='error'){
            useRouter().replace('/login?redirect_uri='+from.fullPath);
          }
          else{
            await useAsyncData('userInfo', () => res.data.value);
          }
    }
    catch(e){
        console.log(e);
        useRouter().replace('/login?redirect_uri='+from.fullPath);
    }
})
  