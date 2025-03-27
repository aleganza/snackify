import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ cookies }) => {
  cookies.delete("access_token", { path: "/" });

  throw redirect(302, "/login");
};
