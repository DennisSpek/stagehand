import { isDateInThePast } from '@/lib/isDateInThePast';

var client_id = process.env.NEXT_PUBLIC_AUTH_SPOTIFY_ID;
var client_secret = process.env.NEXT_PUBLIC_AUTH_SPOTIFY_SECRET;

let access_token: string | null = null;
let expiry_time: Date | null = null;

export const GenerateToken = async () => {
  const isExpired = expiry_time && isDateInThePast(expiry_time)

  try{
    if(!access_token || isExpired){
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'client_credentials', // Replace with the actual grant type value
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
        },
      });

      const data = await response.json(); 
      const currentTime = new Date();

      expiry_time = new Date(currentTime.getTime() + 3600000);
      access_token = data.access_token;

      return data.access_token;
    }

    return access_token;
  } catch(e){
    console.error(e);
  }
}