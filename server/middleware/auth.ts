export default defineNuxtRouteMiddleware(async to => {
    try{
        const google_access_token = useCookie('google_access_token');
        const res = await useFetch('/api/auth/google/get_user', {
            method: 'POST',
            body: {
                access_token: google_access_token
            }
          });
        provide('userInfo', <{name:string, email:string}>res.data.value);
    }
    catch(e){
        console.log(e);
    }
})
  