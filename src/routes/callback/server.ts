import { json } from '@sveltejs/kit';

export async function GET({ url }: any) {
    const code = url.searchParams.get('code');

    if (!code) {
        return json({ error: 'Missing code' }, { status: 400 });
    }

    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')

        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri
        })
    });

    const data = await response.json();

    return json(data);
}
