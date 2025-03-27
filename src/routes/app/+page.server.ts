import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../login/$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get("access_token");

  if (!token) {
    throw redirect(302, "/login");
  }

  return { token };
};
