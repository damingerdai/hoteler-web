/* eslint-disable @typescript-eslint/ban-ts-comment */
export const config = {
    runtime: 'edge',
};

//@ts-ignore
const BACKEND_URL = process.env.BACKEND_URL;

function getCorsHeaders(request: Request): Headers {
    const headers = new Headers();
    const origin = request.headers.get('Origin');

    if (origin) {
        headers.set('Access-Control-Allow-Origin', origin);
    }

    headers.set(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS, PATCH'
    );
    headers.set(
        'Access-Control-Allow-Headers',
        request.headers.get('Access-Control-Request-Headers') || '*'
    );
    headers.set('Access-Control-Max-Age', '86400');

    return headers;
}

function getForwardedHeaders(request: Request): Headers {
    const headers = new Headers(request.headers);

    for (const header of ['connection', 'content-length', 'host', 'referer']) {
        headers.delete(header);
    }

    return headers;
}

export default async function handler(request: Request): Promise<Response> {
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: getCorsHeaders(request),
        });
    }

    if (!BACKEND_URL) {
        return new Response('BACKEND_URL is not configured', { status: 500 });
    }

    const requestUrl = new URL(request.url);
    const forwardedPath =
        requestUrl.searchParams.get('path') || requestUrl.pathname;
    requestUrl.searchParams.delete('path');
    const destinationUrl = new URL(
        forwardedPath + requestUrl.search,
        BACKEND_URL.endsWith('/') ? BACKEND_URL : `${BACKEND_URL}/`
    );

    const proxyRequest = new Request(destinationUrl, {
        body: request.body,
        headers: getForwardedHeaders(request),
        method: request.method,
        ...(request.method !== 'GET' &&
            request.method !== 'HEAD' && { duplex: 'half' as const }),
    });

    try {
        const response = await fetch(proxyRequest);
        const headers = new Headers(response.headers);

        for (const [key, value] of getCorsHeaders(request)) {
            headers.set(key, value);
        }

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers,
        });
    } catch (error) {
        console.error('Proxy fetch failed:', error);

        return new Response(
            JSON.stringify({
                error: 'Proxy request failed',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            }),
            {
                status: 502,
                headers: {
                    'Content-Type': 'application/json',
                    ...Object.fromEntries(getCorsHeaders(request)),
                },
            }
        );
    }
}
