import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get("access_token");

  if (token) {
    throw redirect(307, "/app");
  }

  return {}
};
