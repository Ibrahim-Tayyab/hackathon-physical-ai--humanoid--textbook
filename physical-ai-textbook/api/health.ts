import { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Health check endpoint for Vercel deployment
 * Returns status of the backend service
 */
export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get the backend URL from environment variable or use a fallback
        const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:8000';

        // Try to reach the backend health endpoint
        const response = await fetch(`${backendUrl}/health`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000,
        });

        if (response.ok) {
            const data = await response.json();
            return res.status(200).json({
                status: 'healthy',
                backend: 'connected',
                ...data,
            });
        } else {
            return res.status(503).json({
                status: 'degraded',
                message: 'Backend service returned an error',
                details: response.statusText,
            });
        }
    } catch (error) {
        // Backend is unreachable - return offline status but don't fail the health check
        return res.status(200).json({
            status: 'online',
            backend: 'offline',
            message: 'Frontend is running but backend service is unavailable',
            timestamp: new Date().toISOString(),
        });
    }
}
