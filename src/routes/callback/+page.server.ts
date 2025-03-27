import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, cookies, fetch }) => {
  const code = url.searchParams.get("code");

  if (code) {
    const res = await fetch(`/callback?code=${code}`);
    const data = await res.json();

    const token = data.access_token;

    cookies.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour (spotify tokens expire after 1 hour)
      path: "/",
    });

    throw redirect(303, "/?redirected=true");
  }
};
