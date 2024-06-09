
import User from '@/server/models/userModel';

export async function getUser(email?:string, access_token?:string){
    if(access_token==undefined&&email==undefined)throw new Error('both email and access token is not provided')
    if(access_token==undefined) return await User.findOne({ email });
    if(email==undefined) return await User.findOne({ access_token });
    return await User.findOne({ email, access_token });
}

export async function addUser(email:string, access_token:string, name?: string){
    if(!name)name = email.split('@')[0];
    await User.create({ name, email, access_token });
    const user = await User.findOne({ access_token });
    return user;
}