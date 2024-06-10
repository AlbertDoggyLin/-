
import User from '@/server/models/userModel';

export async function getUser(email:string){
    return await User.findOne({ email });
}

export async function addUser(email:string, name?: string){
    if(!name)name = email.split('@')[0];
    await User.create({ name, email });
    const user = await User.findOne({ email });
    return user;
}