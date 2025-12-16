import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaBook, FaBolt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import useIsBrowser from '@docusaurus/useIsBrowser';
import styles from './ChatAssistant.module.css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    sources?: Source[];
}

interface Source {
    title: string;
    module: string;
    file_path: string;
    score: number;
}

const API_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://hackathon-physical-ai-humanoid-text-kappa.vercel.app/api';

export default function ChatAssistant() {
    const isBrowser = useIsBrowser();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Hi! 👋 I\'m your AI tutor for Physical AI & Humanoid Robotics. Ask me anything about ROS 2, simulation, VLA models, or humanoid design.',
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
    const [refreshToken, setRefreshToken] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const quickPrompts = useMemo(
        () => [
            { icon: '🚀', text: 'ROS 2 quickstart guide' },
            { icon: '🤖', text: 'How to simulate humanoid robots?' },
            { icon: '🧠', text: 'Explain VLA architecture' },
        ],
        []
    );

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isBrowser) return;

        let cancelled = false;

        const checkHealth = async () => {
            try {
                const response = await fetch(`${API_URL}/health`, { cache: 'no-store' });
                if (!response.ok) throw new Error(`Health check failed`);
                const data = await response.json();
                if (!cancelled) setBackendStatus('online');
            } catch (error) {
                if (!cancelled) setBackendStatus('offline');
            }
        };

        checkHealth();
        const intervalId = window.setInterval(checkHealth, 60000);

        return () => {
            cancelled = true;
            window.clearInterval(intervalId);
        };
    }, [isBrowser, refreshToken]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: input,
                    conversation_history: messages.map((msg) => ({
                        role: msg.role,
                        content: msg.content,
                    })),
                }),
            });

            if (!response.ok) throw new Error('Failed to get response');

            const data = await response.json();
            const assistantMessage: Message = {
                role: 'assistant',
                content: data.response,
                sources: data.sources,
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: '❌ Unable to connect to backend. Start the server:\n\n```bash\ncd chatbot\npython api.py\n```',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (!isBrowser) return null;

    return (
        <>
            {/* Modern Floating Toggle Button */}
            <AnimatePresence>
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`${styles.floatingButton} ${!isOpen ? styles.floatingButtonPulse : ''}`}
                    aria-label="Toggle AI Chat Assistant"
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 180, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaTimes size={24} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="robot"
                                initial={{ rotate: 180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -180, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaRobot size={28} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </AnimatePresence>

            {/* Stunning Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop for mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className={`${styles.backdrop} lg:hidden`}
                        />

                        {/* Chat Window */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className={styles.chatWindow}
                        >
                            {/* Header with Glass Effect */}
                            <div className={styles.header}>
                                <div className={styles.headerContent}>
                                    <div className={styles.headerLeft}>
                                        <div className={styles.avatarBox}>
                                            <FaRobot size={24} color="white" />
                                        </div>
                                        <div>
                                            <div className={styles.headerTitle}>AI Tutor</div>
                                            <div className={styles.statusText}>
                                                {backendStatus === 'online' ? (
                                                    <>
                                                        <span className={`${styles.statusDot} ${styles.statusOnline}`} />
                                                        <span>Online</span>
                                                    </>
                                                ) : backendStatus === 'checking' ? (
                                                    <>
                                                        <span className={`${styles.statusDot} ${styles.statusChecking}`} />
                                                        <span>Connecting...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className={`${styles.statusDot} ${styles.statusOffline}`} />
                                                        <span>Offline</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
                                        <FaTimes size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Status Banner */}
                            {backendStatus === 'offline' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    className={styles.statusBanner}
                                >
                                    <FaExclamationCircle />
                                    Backend offline - Start with: <code>python api.py</code>
                                </motion.div>
                            )}

                            {/* Messages Area */}
                            <div className={styles.messagesContainer}>
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className={`${styles.messageRow} ${msg.role === 'user' ? styles.messageRowUser : styles.messageRowAssistant}`}
                                    >
                                        <div className={`${styles.messageContent} ${msg.role === 'user' ? styles.messageUser : styles.messageAssistant}`}>
                                            <div className={styles.messageText}>{msg.content}</div>

                                            {/* Sources */}
                                            {msg.sources && msg.sources.length > 0 && (
                                                <div className={styles.sources}>
                                                    <div className={styles.sourcesTitle}>
                                                        <FaBook size={10} /> Sources
                                                    </div>
                                                    {msg.sources.slice(0, 3).map((source, i) => (
                                                        <div key={i} className={styles.sourceItem}>
                                                            <div className={styles.sourceTitle}>📚 {source.title}</div>
                                                            <div className={styles.sourceModule}>{source.module}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Loading */}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={styles.loadingContainer}
                                    >
                                        <div className={styles.loadingBox}>
                                            <div className={styles.loadingDots}>
                                                {[0, 1, 2].map((i) => (
                                                    <div key={i} className={styles.loadingDot} />
                                                ))}
                                            </div>
                                            AI is thinking...
                                        </div>
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Quick Prompts */}
                            {messages.length <= 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={styles.quickPrompts}
                                >
                                    {quickPrompts.map((prompt) => (
                                        <button
                                            key={prompt.text}
                                            onClick={() => setInput(prompt.text)}
                                            className={styles.quickPromptButton}
                                        >
                                            <span>{prompt.icon}</span>
                                            <span>{prompt.text}</span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}

                            {/* Input Area */}
                            <div className={styles.inputContainer}>
                                <div className={styles.inputWrapper}>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask about ROS 2, humanoids, VLA..."
                                        disabled={isLoading}
                                        className={styles.input}
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={isLoading || !input.trim()}
                                        className={`${styles.sendButton} ${input.trim() && !isLoading ? styles.sendButtonActive : styles.sendButtonDisabled}`}
                                    >
                                        <FaPaperPlane size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
