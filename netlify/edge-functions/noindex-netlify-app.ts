/**
 * Keeps Netlify's own addresses out of search results.
 *
 * Requests to a *.netlify.app host (the project's default address, deploy previews, branch deploys) get
 * `X-Robots-Tag: noindex, nofollow`. Any other host, including www.capitalsites.ca, is passed straight
 * through: the function returns nothing and the response is never touched.
 *
 * On netlify.app it asks for an uncompressed copy, so adding a header can never leave a compressed body
 * mislabelled. Code and image requests are skipped entirely to keep invocations (and credits) low.
 */
type Context = { next: (request?: Request) => Promise<Response> };

export default async (request: Request, context: Context) => {
  if (!new URL(request.url).hostname.endsWith(".netlify.app")) return;
  const headers = new Headers(request.headers);
  headers.delete("accept-encoding");
  const response = await context.next(new Request(request, { headers }));
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
};

export const config = {
  path: "/*",
  excludedPath: ["/_next/static/*", "/_next/image", "/.netlify/*"],
};
