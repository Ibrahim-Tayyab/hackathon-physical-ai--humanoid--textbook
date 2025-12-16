import { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Chat API endpoint for Vercel deployment
 * Proxies to the backend FastAPI service
 */
export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const backendUrl = process.env.BACKEND_API_URL || 'same';
        const { message, conversation_history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        let chatUrl: string;

        if (backendUrl === 'same') {
            // Backend is on same Vercel deployment
            chatUrl = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/chat`;
        } else {
            // Backend is on external service
            chatUrl = `${backendUrl}/chat`;
        }

        const response = await fetch(chatUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message,
                conversation_history: conversation_history || [],
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Chat API error:', error);
        return res.status(503).json({
            error: 'Service unavailable',
            message: 'The chat service is currently offline. Please try again later.',
        });
    }
}
