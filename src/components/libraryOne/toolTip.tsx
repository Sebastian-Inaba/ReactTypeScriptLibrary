import React from "react";
import style from "./basic.module.css";
import { useState, useEffect } from "react"; 

// ToolTipComponent is very similar to previous created components, however this time we have started using react hooks to manage a state and effect.

type ToolTipPosition = "topRight" | "bottomRight" | "topLeft" | "bottomLeft" | "relative";

interface ToolTipProps {
    text: string;
    position?: ToolTipPosition;
    children: React.ReactNode; // read.reactNode is a type that represents any valid React child, such as a string, number, element, or fragment.
    divClassName?: string;    
    divWrapperClassName?: string;   
    spanClassName?: string; 
    topRightClassName?: string; 
    bottomRightClassName?: string; 
    topLeftClassName?: string; 
    bottomLeftClassName?: string; 
    relativeClassName?: string; 
    delay?: number; // Optional delay for showing/hiding tooltip, its set in milliseconds meaning 1000 = 1 second.
}

const ToolTipComponent: React.FC<ToolTipProps> = ({ 
    text,
    position = "relative", 
    children,
    divWrapperClassName = style.divWrapperToolTipComponentStyle,
    divClassName = style.divToolTipComponentStyle,
    spanClassName = style.spanToolTipComponentStyle,
    topRightClassName = style.topRightToolTipComponentStyle,
    bottomRightClassName = style.bottomRightToolTipComponentStyle,
    topLeftClassName = style.topLeftToolTipComponentStyle,
    bottomLeftClassName = style.bottomLeftToolTipComponentStyle,
    relativeClassName = style.relativeToolTipComponentStyle,
    delay = 0,
}) => {
    const [isVisible, setIsVisible] = useState(false); // This is a react state hook, it sets and updates the stat of the tooltip visibility.
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null); // this is a state hook to manage the timeout, for showing/hiding the tooltip.
                                                                            // NodeJS.Timeout is used to set and update a id for the current timeout.
    // This is the mouse enter and leave event handlers for the tooltip.
    // When the mouse enters the DOM element, it removes any existing timeout and sets a new one to "SHOW" the tooltip after the specified delay.
    // When the mouse leaves the DOM element, it removes any existing timeout and sets a new one to "HIDE" the tooltip after the specified delay.
    // They both clare the previous timeout just in case the mouse enters or leaves the element again before the timeout is completed.                                        
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

    // This function returns the class name for the tooltip based on the position prop.
    // It uses a switch statement to determine which case of class name to return based on the position prop.
    // This is one way to manage the different styles for the tooltip based on its position.
    // however in the last component we used react "Record" utility type to manage the different styles for the tooltip based on its position.
    // This is a more flexible way to manage the styles, but for this example i will use the switch statement.
    /* 
    const getPositionClass: Record<ToolTipPosition, string> = {
        topRight: `${divClassName} ${topRightClassName}`,
        bottomRight: `${divClassName} ${bottomRightClassName}`,
        topLeft: `${divClassName} ${topLeftClassName}`,
        bottomLeft: `${divClassName} ${bottomLeftClassName}`,
        relative: `${divClassName} ${relativeClassName}`,
    };
    */
    const getPositionClass = () => {
        switch (position) {
            case "topRight":    
                return `${divClassName} ${topRightClassName}`;
            case "bottomRight":
                return `${divClassName} ${bottomRightClassName}`;
            case "topLeft":
                return `${divClassName} ${topLeftClassName}`;
            case "bottomLeft":
                return `${divClassName} ${bottomLeftClassName}`;
            case "relative":
                return `${divClassName} ${relativeClassName}`; // Relative positioning defined just in case 
            default:
                return `${divClassName} ${relativeClassName}`; // Default to relative positioning
        }
    };

    // useEffect is a React hook that allows you to perform side effects in function components.
    // It's called before or after the render of the component, depending on rules defined.
    // For example you might not want it to render until a specific state changes, or a prop changes.
    // But in this case, it is used to clear the timeout when the component mounts or unmounts.
    // This is important to prevent memory leaks, for example, if the component is removed from the DOM while a timeout is still pending.
    // How does this work?
    // when the component mounts or unmounts (renders for the first time or is removed from the DOM),
    // react will execute the function passed to useEffect.
    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

   return (
        <div 
            className={divWrapperClassName} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} 
        >
            {/* Child element */}
            {children}
            
            {/* Tooltip container */}
            {isVisible && (
                <div className={getPositionClass()} role="tooltip">
                    <span className={spanClassName}>
                        {text}
                    </span>
                </div>
            )}
        </div>
    );
};

export default ToolTipComponent;

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