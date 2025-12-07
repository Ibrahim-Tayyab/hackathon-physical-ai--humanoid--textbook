import React from 'react';
import Content from '@theme-original/Navbar/Content';
import RTLToggle from '@site/src/components/RTLToggle';

export default function ContentWrapper(props) {
    return (
        <>
            <Content {...props} />
            <RTLToggle />
        </>
    );
}
