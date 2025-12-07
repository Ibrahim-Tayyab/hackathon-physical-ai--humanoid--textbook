import React, { useEffect, useState } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import styles from './RTLToggle.module.css';

export default function RTLToggle() {
    const isBrowser = useIsBrowser();
    const [isRTL, setIsRTL] = useState(false);

    useEffect(() => {
        if (!isBrowser) return;

        // Load saved direction preference
        const savedDirection = localStorage.getItem('textDirection');
        if (savedDirection === 'rtl') {
            setIsRTL(true);
            document.documentElement.setAttribute('dir', 'rtl');
        }
    }, [isBrowser]);

    const toggleDirection = () => {
        const newDirection = !isRTL;
        setIsRTL(newDirection);

        if (newDirection) {
            document.documentElement.setAttribute('dir', 'rtl');
            localStorage.setItem('textDirection', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            localStorage.setItem('textDirection', 'ltr');
        }
    };

    if (!isBrowser) return null;

    return (
        <button
            onClick={toggleDirection}
            className={styles.rtlToggle}
            aria-label={isRTL ? 'Switch to LTR' : 'Switch to RTL'}
            title={isRTL ? 'English Layout' : 'اردو Layout'}
        >
            {isRTL ? 'English' : 'اردو'}
        </button>
    );
}
