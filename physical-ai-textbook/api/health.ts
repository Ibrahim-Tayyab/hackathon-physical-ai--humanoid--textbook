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
        // Check if we're using a separate backend or if backend is deployed on Vercel
        const backendUrl = process.env.BACKEND_API_URL;

        if (backendUrl && backendUrl !== 'same') {
            // Try to reach the external backend health endpoint
            const response = await fetch(`${backendUrl}/health`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                return res.status(200).json({
                    status: 'healthy',
                    backend: 'connected',
                    ...data,
                });
            } else {
                return res.status(200).json({
                    status: 'online',
                    backend: 'degraded',
                    message: 'Frontend is online, backend service is having issues',
                });
            }
        } else {
            // Backend is on same Vercel deployment
            return res.status(200).json({
                status: 'healthy',
                deployment: 'vercel',
                message: 'Frontend and backend running on Vercel',
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        // Backend is unreachable - return online status but don't fail the health check
        return res.status(200).json({
            status: 'online',
            backend: 'offline',
            message: 'Frontend is running',
            timestamp: new Date().toISOString(),
        });
    }
}
 