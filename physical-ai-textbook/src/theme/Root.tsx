import React from 'react';
import ChatAssistant from '@site/src/components/ChatAssistant';

export default function Root({ children }) {
    console.log('🔧 Root.tsx wrapper active - ChatAssistant should render globally');

    return (
        <>
            {children}
            <ChatAssistant />
        </>
    );
}
