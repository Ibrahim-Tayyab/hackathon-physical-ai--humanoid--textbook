"""
FastAPI Backend with Agentic RAG for Physical AI Textbook
Uses OpenAI function calling with Qdrant retrieval
"""

import json
import logging
import os
import traceback
from typing import List, Optional, Tuple

import cohere
import httpx
import openai
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel
from qdrant_client import QdrantClient

# Load environment
load_dotenv()

logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO").upper(),
    format="%(asctime)s %(levelname)s %(name)s - %(message)s"
)

# Configuration
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "physical_ai_book")
TOP_K = int(os.getenv("TOP_K_RESULTS", "5"))
MODEL_NAME = os.getenv("MODEL_NAME", "gemini-1.5-flash")
_available_models_cache: List[str] = []
ACTIVE_MODEL = MODEL_NAME
MODEL_NOTICE: Optional[str] = None

# Initialize clients
qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
cohere_client = cohere.Client(COHERE_API_KEY)

# Initialize OpenAI client configured for Google Gemini
openai_client = OpenAI(
    api_key=GOOGLE_API_KEY,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)


def refresh_model_selection(force: bool = False) -> Tuple[str, Optional[str]]:
    global _available_models_cache, ACTIVE_MODEL, MODEL_NOTICE

    if _available_models_cache and not force:
        return ACTIVE_MODEL, MODEL_NOTICE

    try:
        models_response = openai_client.models.list()
        _available_models_cache = [model.id for model in models_response.data]
    except Exception as error:
        logging.error("Failed to list Gemini models: %s", error, exc_info=True)
        MODEL_NOTICE = (
            "⚠️ Unable to verify available Gemini models automatically."
            " Using configured model and relying on manual configuration."
        )
        ACTIVE_MODEL = MODEL_NAME
        return ACTIVE_MODEL, MODEL_NOTICE

    if MODEL_NAME in _available_models_cache:
        ACTIVE_MODEL = MODEL_NAME
        MODEL_NOTICE = None
    else:
        preferred_flash_models = [
            "gemini-1.5-flash",
            "gemini-1.5-flash-latest",
            "gemini-1.5-flash-001",
        ]
        fallback = next((m for m in preferred_flash_models if m in _available_models_cache), None)
        if not fallback:
            fallback = next((m for m in _available_models_cache if "flash" in m), None)
        if not fallback and _available_models_cache:
            fallback = _available_models_cache[0]

        if fallback:
            logging.warning(
                "Requested Gemini model '%s' not available. Falling back to '%s'.",
                MODEL_NAME,
                fallback,
            )
            ACTIVE_MODEL = fallback
            MODEL_NOTICE = (
                f"Requested Gemini model '{MODEL_NAME}' is unavailable; using '{fallback}' instead."
            )
        else:
            ACTIVE_MODEL = MODEL_NAME
            MODEL_NOTICE = (
                "No Gemini models are accessible with the current API key."
            )

    return ACTIVE_MODEL, MODEL_NOTICE


refresh_model_selection()

# FastAPI app
app = FastAPI(title="Physical AI Textbook Chatbot API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models
class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[ChatMessage]] = []


class ChatResponse(BaseModel):
    response: str
    sources: List[dict]


# RAG Tool: Retrieve Knowledge from Qdrant
def retrieve_knowledge(query: str, top_k: int = TOP_K) -> dict:
    """
    Retrieves relevant context from the Physical AI textbook using semantic search.
    
    Args:
        query: The user's question
        top_k: Number of relevant chunks to retrieve
    
    Returns:
        Dictionary with retrieved context and sources
    """
    try:
        # Embed the query using Cohere
        response = cohere_client.embed(
            texts=[query],
            model='embed-english-v3.0',
            input_type='search_query'
        )
        
        query_vector = response.embeddings[0]
        
        # Search Qdrant using the first compatible client method to guard
        # against SDK changes. This prevents AttributeErrors when the client
        # surface evolves between versions.
        search_response = None
        search_method_used: Optional[str] = None
        search_attempt_used: Optional[str] = None
        last_error: Optional[Exception] = None

        method_order = ("query_points", "search_points", "search")

        for method_name in method_order:
            method = getattr(qdrant_client, method_name, None)
            if method is None:
                continue

            candidate_attempts = []
            for collection_key in ("collection_name", "collection"):
                for vector_key in ("query_vector", "vector"):
                    kwargs = {
                        collection_key: COLLECTION_NAME,
                        vector_key: query_vector,
                        "limit": top_k,
                    }
                    kwargs_with_payload = dict(kwargs)
                    kwargs_with_payload["with_payload"] = True

                    candidate_attempts.append(
                        (f"{method_name}:{vector_key}:{collection_key}:payload", kwargs_with_payload)
                    )
                    candidate_attempts.append(
                        (f"{method_name}:{vector_key}:{collection_key}:no_payload", dict(kwargs))
                    )

            for attempt_label, attempt_kwargs in candidate_attempts:
                try:
                    search_response = method(**attempt_kwargs)
                    search_method_used = method_name
                    search_attempt_used = attempt_label
                    break
                except Exception as method_error:
                    logging.debug(
                        "Qdrant %s attempt '%s' failed: %s",
                        method_name,
                        attempt_label,
                        method_error,
                    )
                    last_error = method_error
            if search_response is not None:
                break

        if search_response is None:
            try:
                rest_url = QDRANT_URL.rstrip("/") + f"/collections/{COLLECTION_NAME}/points/search"
                rest_headers = {"Content-Type": "application/json"}
                if QDRANT_API_KEY:
                    rest_headers["api-key"] = QDRANT_API_KEY
                rest_payload = {
                    "vector": query_vector,
                    "limit": top_k,
                    "with_payload": True,
                }
                response = httpx.post(rest_url, json=rest_payload, headers=rest_headers, timeout=15.0)
                response.raise_for_status()
                search_response = response.json().get("result", [])
                search_method_used = "httpx.post"
                search_attempt_used = "rest:vector:with_payload"
            except Exception as http_error:
                last_error = http_error
                raise RuntimeError(
                    "No compatible Qdrant search method succeeded. Last error: %s"
                    % (last_error or "unknown")
                ) from http_error

        # Newer Qdrant clients return a QueryResponse with `.points`; HTTP calls
        # respond with `.result`; older ones may expose an iterable list. Normalize
        # so downstream code can iterate without caring about which path executed.
        search_results = getattr(search_response, "points", None)
        if search_results is None:
            search_results = getattr(search_response, "result", search_response)
        if search_results is None:
            search_results = []
        elif not isinstance(search_results, list):
            search_results = list(search_results)

        logging.debug(
            "Qdrant retrieval succeeded via %s (%s)",
            search_method_used,
            search_attempt_used,
        )
        
        # Format results
        contexts = []
        sources = []

        for result in search_results:
            payload = getattr(result, "payload", None)
            if payload is None and isinstance(result, dict):
                payload = result.get("payload") or {}
            payload = payload or {}
            text_chunk = (payload.get('text') or '').strip()
            if not text_chunk:
                continue

            contexts.append(text_chunk)
            score = getattr(result, "score", None)
            if score is None and isinstance(result, dict):
                score = result.get("score")
            sources.append({
                'title': payload.get('title', 'Unknown section'),
                'module': payload.get('module', 'Unknown module'),
                'file_path': payload.get('file_path', ''),
                'score': score
            })
        
        # Combine contexts
        combined_context = "\n\n---\n\n".join(contexts)
        
        return {
            'context': combined_context,
            'sources': sources,
            'success': True
        }
    
    except Exception as e:
        logging.error("Error in retrieve_knowledge: %s", e, exc_info=True)
        return {
            'context': '',
            'sources': [],
            'success': False,
            'error': str(e)
        }


# Define function schema for OpenAI
RETRIEVE_KNOWLEDGE_FUNCTION = {
    "name": "retrieve_knowledge",
    "description": "Retrieves relevant information from the Physical AI & Humanoid Robotics textbook based on the user's question. Use this tool EVERY time before answering to ensure accuracy.",
    "parameters": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "The user's question or search query"
            },
            "top_k": {
                "type": "integer",
                "description": "Number of relevant text chunks to retrieve (default: 5)",
                "default": 5
            }
        },
        "required": ["query"]
    }
}


# System prompt (Constitution)
SYSTEM_PROMPT = """You are the AI Tutor for the **Physical AI & Humanoid Robotics** course by Muhammed Ibrahim.

**CRITICAL RULES:**
1. You MUST use the `retrieve_knowledge` function BEFORE answering ANY question about the course content.
2. You MUST answer questions using ONLY the information retrieved from the textbook.
3. If the retrieved context does not contain the answer, state: "I don't have that information in the textbook. Please check the relevant module or ask a more specific question."
4. NEVER hallucinate or use external knowledge beyond the textbook.
5. When answering, cite the specific module/chapter where the information was found.
6. Be concise but thorough. Use bullet points and code examples when relevant.
7. If asked about ROS 2, simulation, Isaac, VLA models, humanoid design, or reinforcement learning, retrieve the relevant chapters first.

**Your Goal:** Help students understand Physical AI concepts by providing accurate, textbook-based answers."""


def run_agent(user_message: str, conversation_history: List[dict]) -> dict:
    """
    Runs the OpenAI agent with function calling capabilities
    """
    # Prepare messages
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT}
    ]
    
    # Add conversation history (last 5 messages for context)
    messages.extend(conversation_history[-5:])
    
    # Add current user message
    messages.append({"role": "user", "content": user_message})
    
    # First LLM call with tools (OpenAI v1 format compatible with Gemini)
    model_in_use, model_notice = refresh_model_selection()

    try:
        response = openai_client.chat.completions.create(
            model=model_in_use,
            messages=messages,
            tools=[{
                "type": "function",
                "function": RETRIEVE_KNOWLEDGE_FUNCTION
            }],
            tool_choice="auto",
            temperature=0.3,
            max_tokens=1500
        )
    except openai.NotFoundError as e:
        logging.error("Gemini initial completion 404: %s", e, exc_info=True)
        previous_model = model_in_use
        refreshed_model, model_notice = refresh_model_selection(force=True)

        if refreshed_model and refreshed_model != previous_model:
            try:
                response = openai_client.chat.completions.create(
                    model=refreshed_model,
                    messages=messages,
                    tools=[{
                        "type": "function",
                        "function": RETRIEVE_KNOWLEDGE_FUNCTION
                    }],
                    tool_choice="auto",
                    temperature=0.3,
                    max_tokens=1500
                )
            except Exception as retry_error:
                logging.error("Gemini retry after 404 failed: %s", retry_error, exc_info=True)
                return {
                    'response': f"❌ Gemini retry failed with model '{refreshed_model}': {retry_error}",
                    'sources': []
                }
        else:
            return {
                'response': (
                    "❌ Gemini reports the requested model is unavailable." \
                    " Please check https://ai.google.dev/gemini-api/docs/openai for the list of supported models."
                ),
                'sources': []
            }
    except openai.RateLimitError as e:
        logging.error("Gemini rate limit hit: %s", e, exc_info=True)
        return {
            'response': (
                "⏳ Gemini rate limit reached. Wait a moment or review usage limits at https://ai.google.dev/gemini-api/docs/rate-limits."
            ),
            'sources': []
        }
    except Exception as e:
        logging.error("Gemini initial completion failed: %s", e, exc_info=True)
        return {
            'response': f"❌ Gemini initial request failed: {e}",
            'sources': []
        }
    
    assistant_message = response.choices[0].message
    
    # Check if tools were called
    if assistant_message.tool_calls:
        tool_call = assistant_message.tool_calls[0]
        function_name = tool_call.function.name

        try:
            raw_arguments = tool_call.function.arguments or '{}'
            function_args = json.loads(raw_arguments)
        except (TypeError, json.JSONDecodeError) as parse_error:
            logging.error("Failed to parse tool arguments: %s", parse_error)
            logging.error("Raw arguments: %s", tool_call.function.arguments)
            function_args = {}
        
        # Call the function
        if function_name == "retrieve_knowledge":
            function_result = retrieve_knowledge(
                query=function_args.get('query', user_message),
                top_k=function_args.get('top_k', TOP_K)
            )

            if not function_result.get('success') or not function_result.get('context'):
                return {
                    'response': (
                        "I don't have that information in the textbook. Please check the relevant module"
                        " or ask a more specific question."
                    ),
                    'sources': []
                }
            
            # Add assistant message with tool calls
            messages.append({
                "role": "assistant",
                "content": None,
                "tool_calls": [{
                    "id": tool_call.id,
                    "type": "function",
                    "function": {
                        "name": function_name,
                        "arguments": tool_call.function.arguments
                    }
                }]
            })
            
            # Add tool response
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": function_result['context']
            })
            
            # Second LLM call with retrieved context
            try:
                final_response = openai_client.chat.completions.create(
                    model=refresh_model_selection()[0],
                    messages=messages,
                    temperature=0.0,
                    max_tokens=1200
                )
            except Exception as e:
                logging.error("Gemini follow-up completion failed: %s", e, exc_info=True)
                return {
                    'response': f"❌ Gemini follow-up request failed: {e}",
                    'sources': []
                }
            
            final_message = final_response.choices[0].message.content

            if not final_message:
                final_message = "I wasn't able to draft a response from the retrieved context. Please try rephrasing your question."  # graceful fallback

            if model_notice:
                final_message = f"{final_message}\n\nℹ️ {model_notice}"

            if function_result['sources']:
                cite = function_result['sources'][0]
                final_message = (
                    f"{final_message}\n\nSource: {cite.get('module', 'Unknown module')} – {cite.get('title', cite.get('file_path', ''))}"
                )

            return {
                'response': final_message,
                'sources': function_result['sources']
            }
    
    # If no function call, return direct response
    direct_response = assistant_message.content or "I couldn't produce a response. Please try again in a moment."
    if model_notice:
        direct_response = f"{direct_response}\n\nℹ️ {model_notice}"

    return {
        'response': direct_response,
        'sources': []
    }


# API Endpoints
@app.get("/")
async def root():
    return {
        "message": "Physical AI Textbook Chatbot API",
        "version": "1.0",
        "endpoints": {
            "/chat": "POST - Chat with the AI tutor",
            "/health": "GET - Health check"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test Qdrant connection
        collection_info = qdrant_client.get_collection(collection_name=COLLECTION_NAME)
        
        return {
            "status": "healthy",
            "qdrant": "connected",
            "vectors": collection_info.points_count,
            "collection": COLLECTION_NAME
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Health check failed: {str(e)}")


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Main chat endpoint - processes user message and returns AI response
    """
    try:
        # Convert Pydantic models to dicts
        history = [msg.model_dump() for msg in request.conversation_history]
        
        # Run the agent
        result = run_agent(request.message, history)
        
        return ChatResponse(
            response=result['response'],
            sources=result['sources']
        )
    
    except Exception as e:
        logging.error("Chat endpoint failed: %s", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")


@app.post("/search")
async def search_textbook(query: str, top_k: int = 5):
    """
    Direct search endpoint (for testing)
    """
    try:
        result = retrieve_knowledge(query, top_k)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
