import React, { useEffect, useState } from "react";
import style from "./basic.module.css";

// Like the toolTip component we are also using useEffect and useState hooks
// I have also tried to make the positioning of the text and % a bit customizable

type Position = "top" | "bottom" | "left" | "right" | "inside" | "none";

interface ProgressBarProps {
    progress: number; 
    progressText?: string; 
    progressTextPosition?: Position; // text position
    percentagePosition?: Position; // % position
    className?: string; 
    trackClassName?: string; 
    progressClassName?: string; 
    textClassName?: string; 
    centeredPercentageClassName?: string; 
    topBottomWrapperClassName?: string;
    sideWrapperClassName?: string;
    mainWrapperClassName?: string;
    striped?: boolean; // style to make the progress of the bar more apparent 
    animated?: boolean; // animation to make the progress "slide"
}

const ProgressBarComponent: React.FC<ProgressBarProps> = ({
    progress,
    progressText = "",
    progressTextPosition = "none",
    percentagePosition = "inside",
    className = style.progressBarComponentStyle, 
    trackClassName = style.progressBarTrackComponentStyle, 
    progressClassName = style.progressBarFillComponentStyle, 
    textClassName = style.progressBarTextComponentStyle, 
    centeredPercentageClassName = style.progressBarCenteredPercentage,
    topBottomWrapperClassName = style.progressBarTopBottomWrapperComponentStyle,
    sideWrapperClassName = style.progressBarSideWrapperComponentStyle,
    mainWrapperClassName = style.progressBarMainWrapperComponentStyle,
    striped = false,
    animated = false,
}) => {
    // State to animate progress from 0 to target
    const [currentProgress, setCurrentProgress] = useState(0);

    // Animate progress using requestAnimationFrame, going 1 by 1
    useEffect(() => {
        let frameId: number;

        const step = () => {
        setCurrentProgress((prev) => {
            if (prev < progress) {
            frameId = requestAnimationFrame(step); // Keep "stepping" until target is reached
            return Math.min(prev + 1, progress); // 1 by 1
            }
            return prev; 
        });
        };

        step(); // Kicks off the animation

        // Cleanup if component unmounts 
        return () => cancelAnimationFrame(frameId);
    }, [progress]);

    // Format progress value as "number%"
    const percentageText = `${currentProgress}%`;

    // Build the className for the progress fill element
    // Adds optional visual styles like stripes or animation
    const progressFillClass = [
        progressClassName,               // Base fill style
        striped ? style.striped : "",   // Adds striped background style if enabled
        animated ? style.animated : "",// Adds animated style effect if enabled
    ]
    .filter(Boolean) // Remove any empty strings
    .join(" ");     // Join into a single className string

    // Utility function to render a text span using shared styling
    const renderText = (text: string) => (
        <span className={textClassName}>{text}</span>
    );

    // We use react DOM positioning for top,right, etc... instead of having a separate style for every position
    return (
        <div className={className}>
        {/* Top-aligned labels are placed ABOVE the track in the DOM, so browser renders them on top */}
        {(progressTextPosition === "top" || percentagePosition === "top") && (
            <div className={topBottomWrapperClassName}>
            {progressTextPosition === "top" && renderText(progressText)}
            {percentagePosition === "top" && renderText(percentageText)}
            </div>
        )}

        {/* This wrapper arranges left–center–right horizontally (using flex) */}
        <div className={mainWrapperClassName}>
            {/* Left-aligned labels are placed BEFORE the track in the DOM */}
            {(progressTextPosition === "left" || percentagePosition === "left") && (
            <div className={sideWrapperClassName}>
                {progressTextPosition === "left" && renderText(progressText)}
                {percentagePosition === "left" && renderText(percentageText)}
            </div>
            )}

            {/* Main progress track */}
            <div
            className={trackClassName}
            role="progressbar" // ARIA accessibility role
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={currentProgress} // Live progress
            aria-label={progressText || `Progress: ${percentageText}`} // Accessible label
            >
            {/* Progress fill with dynamic width */}
            <div className={progressFillClass} style={{ width: `${currentProgress}%` }} />
                {/* INSIDE position: absolutely centered over the track */}
                {percentagePosition === "inside" && (
                    <span className={centeredPercentageClassName}>
                    {percentageText}
                    </span>
                )}
                {progressTextPosition === "inside" && (
                    <span className={centeredPercentageClassName}>
                    {progressText}
                    </span>
                )}
            </div>

            {/* Right-aligned labels are placed AFTER the track in the DOM */}
            {(progressTextPosition === "right" || percentagePosition === "right") && (
            <div className={sideWrapperClassName}>
                {progressTextPosition === "right" && renderText(progressText)}
                {percentagePosition === "right" && renderText(percentageText)}
            </div>
            )}
        </div>

        {/* Bottom-aligned labels are placed AFTER the track wrapper in the DOM, so they appear underneath */}
        {(progressTextPosition === "bottom" || percentagePosition === "bottom") && (
            <div className={topBottomWrapperClassName}>
            {progressTextPosition === "bottom" && renderText(progressText)}
            {percentagePosition === "bottom" && renderText(percentageText)}
            </div>
        )}
        </div>
    );
};

export default ProgressBarComponent;

/* 

USAGE EXAMPLES:

// 1. Simple progress bar with inside percentage text and animation
// <ProgressBarComponent progress={75} animated />

// 2. Progress bar with progress label above and percentage below the bar
// <ProgressBarComponent progress={50} progressText="Loading..." progressTextPosition="top" percentagePosition="bottom" striped />

// 3. Progress bar with progress label to the left and percentage to the right
// <ProgressBarComponent progress={30} progressText="Step 1" progressTextPosition="left" percentagePosition="right" animated striped />

// 4. Progress bar with progress text hidden and percentage shown outside on the right
// <ProgressBarComponent progress={90} percentagePosition="right" />

// 5. Progress bar with no labels shown
// <ProgressBarComponent progress={45} progressTextPosition="none" percentagePosition="none" />

// 6. Progress bar with custom class names for styling
// <ProgressBarComponent
//    progress={65}
//    className="myProgressBarWrapper"
//    trackClassName="myTrackClass"
//    progressClassName="myFillClass"
//    textClassName="myTextClass"
//    striped
//    animated
// />

*/