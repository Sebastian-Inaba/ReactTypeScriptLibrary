import React from "react";
import styles from "./basic.module.css";

//Very simple divider component that works both vertical and horizontal 

interface DividerProps {
    className?: {
        dividerClassName?: string;
        verticalClassName?: string;
        horizontalClassName?: string;
    };
    vertical?: boolean;
}

const DividerComponent: React.FC<DividerProps> = ({
    vertical = false,
    className = {}
}) => {
    const {
        dividerClassName = styles.dividerComponentStyle,
        verticalClassName = styles.verticalDividerComponentStyle,
        horizontalClassName = styles.horizontalDividerComponentStyle,
    } = className;
    return (
        <div
            className={`${dividerClassName} ${vertical ? verticalClassName : horizontalClassName}`}
        />
    );
};

export default DividerComponent;

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