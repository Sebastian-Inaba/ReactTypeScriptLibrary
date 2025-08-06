import React from 'react';
import style from './Divider.module.css';

// Divider component

interface DividerProps {
    className?: string;
    vertical?: boolean;
}

export const DividerComponent: React.FC<DividerProps> = ({ vertical = false, className = '' }) => {
    return (
        <div
            className={`${className} ${style.DividerComponentDiv} ${vertical ? style.DividerComponentVerticalPosition : style.DividerComponentHorizontalPosition}`}
        />
    );
};

/*

USAGE EXAMPLES:

// 1. Basic horizontal divider (default):
// <Divider />

// 2. Vertical divider:
// --------------------
// <Divider vertical />

// 3. Custom class names (overriding the defaults):
// <Divider
//   className={{
//     dividerClassName: "myDividerWrapper",
//     horizontalClassName: "myHorizontalLine",
//     verticalClassName: "myVerticalLine",
//   }}
// />

// 4. Inside a flex container to separate two items:
// <div style={{ display: "flex", alignItems: "center" }}>
//   <span>Left</span>
//   <Divider vertical />
//   <span>Right</span>
// </div>

*/
