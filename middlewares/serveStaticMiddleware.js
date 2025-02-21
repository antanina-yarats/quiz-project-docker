import { serveFile } from "../deps.js";

const serveStaticMiddleware = async (context, next) => {
  if (context.request.url.pathname.startsWith("/static")) {
    const filePath = context.request.url.pathname.substring(7); 
    const fullPath = `${Deno.cwd()}/static/${filePath}`;

    try {
      const file = await serveFile(context.request, fullPath);
      context.response.body = file.body;
      context.response.headers = file.headers;
      context.response.status = file.status;
    } catch (error) {
      console.error("Error serving static file:", error.message);
      context.response.status = 404;
      context.response.body = "File not found";
    }
  } else {
    await next();
  }
};

export { serveStaticMiddleware };
