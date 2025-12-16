import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
): Promise<void> {
    // Handle CORS
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    // Handle preflight
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    // Only allow GET
    if (req.method !== "GET") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

        const response = await fetch(`${backendUrl}/health`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Backend returned ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Health check error:", error);
        res.status(503).json({
            status: "unhealthy",
            error: "Backend service unavailable",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
