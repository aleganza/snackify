import { accessToken } from '$lib/stores/auth';

export async function getUserProfile() {
    let token;
    accessToken.subscribe((t) => token = t);

    const res = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${token}` }
    });

    return await res.json();
}
