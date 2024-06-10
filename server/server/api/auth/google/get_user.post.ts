import { OAuth2Client } from 'google-auth-library'
import { addUser, getUser } from '~/server/db/user'

export default defineEventHandler(async (event) => {
    const { access_token } = await readBody(event);
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
        const email = (<{ email: string }>userInfo).email;
        const user = await getUser(email);
        if (!user) throw new Error("user not added to db");
        const name = user.name as string;
        return { name, email };
    } catch (err) {
        createError(String(err));
    };
})