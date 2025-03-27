import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get("access_token");

  return { token };
};
