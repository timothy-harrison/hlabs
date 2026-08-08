import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Embedded Page</title>
        <style>
          body { font-family: sans-serif; padding: 1rem; }
        </style>
      </head>
      <body>
        <h1>Hello from the server</h1>
      </body>
    </html>
  `;

    return new Response(html, {
        headers: {
            'Content-Type': 'text/html'
        }
    });
}