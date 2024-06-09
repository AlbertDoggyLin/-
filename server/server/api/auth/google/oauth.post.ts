import { OAuth2Client } from 'google-auth-library'
import { addUser, getUser } from '~/server/db/user'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const oauth2Client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
  })
  let { tokens } = await oauth2Client.getToken({
    code: body.authCode as string
  })
  const access_token = <string>tokens.access_token;
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

  const email = (<{email:string}>userInfo).email;

  let user = await getUser(email);
  if(!user) user = await addUser(email, access_token);
  else{
    user.access_token = access_token;
    user.save();
  }
  const { name } = user as { name:string };
  setCookie(event, 'google_access_token', access_token);
  return { name, email };
})