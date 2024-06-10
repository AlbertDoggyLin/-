export interface UserInfo{
    name: string | null,
    email: string | null
}

export default class AppData{
    private constructor(){ }
    private static instance:AppData = new AppData();
    public static getInstance(){
        return this.instance;
    }

    public userInfo:UserInfo = {
        name: null,
        email: null
    }
}
