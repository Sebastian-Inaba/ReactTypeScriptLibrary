import React from 'react';
import style from './ToolTip.module.css';
import { useState, useEffect } from 'react';

// ToolTip component

type ToolTipPosition = 'topRight' | 'bottomRight' | 'topLeft' | 'bottomLeft' | 'relative';

interface ToolTipProps {
    text: string;
    position?: ToolTipPosition;
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export const ToolTipComponent: React.FC<ToolTipProps> = ({
    text,
    position = 'relative',
    children,
    delay = 0,
    className = '',
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    // This is the mouse enter and leave event handlers for the tooltip.
    const handleMouseEnter = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const id = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        setTimeoutId(id);
    };

    const handleMouseLeave = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const id = setTimeout(() => {
            setIsVisible(false);
        }, delay);
        setTimeoutId(id);
    };

    // Switch statement to determine which case of class name to return based on the position prop.
    // Record is a more flexible way to manage the styles, but for this example i will use the switch statement.
    /* 
    const getPositionClass: Record<ToolTipPosition, string> = {
        topRight: `${style.ToolTipComponentDiv} ${style.ToolTipComponentTopRightPosition}`,
        bottomRight: `${style.ToolTipComponentDiv} ${style.ToolTipComponentBottomRightPosition}`,
        topLeft: `${style.ToolTipComponentDiv} ${style.ToolTipComponentTopLeftPosition}`,
        bottomLeft: `${style.ToolTipComponentDiv} ${style.ToolTipComponentBottomLeftPosition}`,
        relative: `${style.ToolTipComponentDiv} ${style.ToolTipComponentRelativePosition}`,
    };
    */
    const getPositionClass = () => {
        switch (position) {
            case 'topRight':
                return `${style.ToolTipComponentDiv} ${style.ToolTipComponentTopRightPosition}`;
            case 'bottomRight':
                return `${style.ToolTipComponentDiv} ${style.ToolTipComponentBottomRightPosition}`;
            case 'topLeft':
                return `${style.ToolTipComponentDiv} ${style.ToolTipComponentTopLeftPosition}`;
            case 'bottomLeft':
                return `${style.ToolTipComponentDiv} ${style.ToolTipComponentBottomLeftPosition}`;
            case 'relative':
                return `${style.ToolTipComponentDiv} ${style.ToolTipComponentRelativePosition}`; // Relative positioning defined just in case
            default:
                return `${style.ToolTipComponentDiv} ${style.ToolTipComponentRelativePosition}`; // Default to relative positioning
        }
    };

    // Component mounts or unmounts clear timeout
    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    return (
        <div
            className={`${className} ${style.ToolTipComponentDivWrapper}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Child element */}
            {children}

            {/* Tooltip container */}
            {isVisible && (
                <div className={getPositionClass()} role="tooltip">
                    <span className={`${className} ${style.ToolTipComponentSpan}`}>{text}</span>
                </div>
            )}
        </div>
    );
};

/*

USAGE EXAMPLES:

// 1. Basic usage with default position (relative)
// <ToolTipComponent text="This is a tooltip">
//   <button>Hover me</button>
// </ToolTipComponent>

// 2. Tooltip on top-right of element
// <ToolTipComponent text="I'm top right!" position="topRight">
//   <div>Hover over me</div>
// </ToolTipComponent>

// 3. Tooltip with delay (500ms)
// <ToolTipComponent text="Delayed tooltip" delay={500}>
//   <span>Hover slowly</span>
// </ToolTipComponent>

// 4. Custom styles passed via props
// <ToolTipComponent
//   text="Styled tooltip"
//   position="bottomLeft"
//   divClassName="myCustomWrapper"
//   spanClassName="myCustomText"
//   bottomLeftClassName="myCustomBottomLeft"
// >
//   <img src="/icon.png" alt="hover" />
// </ToolTipComponent>

// 5. In a loop / list:
// {items.map((item, index) => (
//   <ToolTipComponent key={index} text={item.description}>
//     <p>{item.name}</p>
//   </ToolTipComponent>
// ))}

*/
