import { redirect } from '@sveltejs/kit';
import { PUBLIC_SPOTIFY_CLIENT_ID, PUBLIC_SPOTIFY_REDIRECT_URI } from '$env/static/public';

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SCOPES = ['user-read-private', 'user-read-email'];

export function authenticate() {
    const params = new URLSearchParams({
        client_id: PUBLIC_SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: PUBLIC_SPOTIFY_REDIRECT_URI,
        scope: SCOPES.join(' '),
    });
    throw redirect(302, `${SPOTIFY_AUTH_URL}?${params.toString()}`);
}

export async function getAccessToken(code) {
    const response = await fetch(SPOTIFY_TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${PUBLIC_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`)}`,
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: PUBLIC_SPOTIFY_REDIRECT_URI,
        }),
    });
    return response.json();
}

export async function load({ url, cookies }) {
    const code = url.searchParams.get('code');
    if (code) {
        const tokenData = await getAccessToken(code);
        cookies.set('spotify_access_token', tokenData.access_token, { path: '/', httpOnly: true, secure: true });
        throw redirect(302, '/');
    }
}
