// ─── Ручные редиректы ───
// Формат: "/старый-путь": "/новый-путь"
// Добавь строку сюда, запуш — редирект заработает сразу
const redirects: Record<string, string> = {
  // Пример:
  // "/old-page": "/new-page",
  // "/ru/old-page": "/ru/new-page",
};

export default {
  async fetch(request: Request, env: { ASSETS: { fetch: typeof fetch } }) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 1. Проверить ручные редиректы
    if (redirects[path]) {
      return Response.redirect(`${url.origin}${redirects[path]}`, 301);
    }

    // 2. Попробовать отдать статический файл
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    // 3. Старые URL базы знаний были без /kb/ — пробуем добавить
    if (!path.startsWith('/kb/')) {
      const kbResponse = await env.ASSETS.fetch(
        new Request(new URL(`/kb${path}`, url.origin))
      );

      if (kbResponse.status !== 404) {
        return Response.redirect(`${url.origin}/kb${path}`, 301);
      }
    }

    // 4. Ничего не нашлось — показать 404
    return response;
  },
};
