import { OAuth2Client } from 'google-auth-library'
import { getUser } from '~/server/db/user'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { access_token, name } = body;
    const oauth2Client = new OAuth2Client({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI
    })
    oauth2Client.setCredentials({ access_token })

    const userInfo = await oauth2Client
        .request({
            url: 'https://www.googleapis.com/oauth2/v3/userinfo'
        })
        .then((response) => response.data)
        .catch(() => null)

    if (!userInfo) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid token'
        })
    }

    try {
        const user = await getUser((<{ email: string }>userInfo).email);
        if (!user) throw new Error("user not added to db");
        if(name)user.name = name;
        user.save();
    } catch (err) {
        createError(String(err));
    };
})