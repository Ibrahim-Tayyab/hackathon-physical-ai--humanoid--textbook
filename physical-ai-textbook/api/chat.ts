import { VercelRequest, VercelResponse } from "@vercel/node";

interface ChatRequest {
    message: string;
    conversation_history?: Array<{
        role: string;
        content: string;
    }>;
}

interface ChatResponse {
    response: string;
    sources: Array<{
        module: string;
        title: string;
        file_path: string;
        content: string;
    }>;
}

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

    // Only allow POST
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const { message, conversation_history = [] } = req.body as ChatRequest;

        if (!message) {
            res.status(400).json({ error: "Message is required" });
            return;
        }

        // Call the local FastAPI backend
        const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

        const response = await fetch(`${backendUrl}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
                conversation_history,
            }),
        });

        if (!response.ok) {
            throw new Error(`Backend returned ${response.status}`);
        }

        const data: ChatResponse = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Chat API error:", error);
        res.status(500).json({
            error: "Failed to process chat request",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
