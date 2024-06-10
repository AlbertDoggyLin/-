import AppData from "~/pages/AppData";

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
            AppData.getInstance().userInfo.email = res.data.value?res.data.value.email:null;
            AppData.getInstance().userInfo.name = res.data.value?res.data.value.name:null;
          }
    }
    catch(e){
        console.log(e);
        useRouter().replace('/login?redirect_uri='+from.fullPath);
    }
})
  