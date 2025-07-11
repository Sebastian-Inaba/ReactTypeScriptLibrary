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

// 2. Progress bar with progress label to the left and percentage to the right
// <ProgressBarComponent progress={30} progressText="download something" progressTextPosition="left" percentagePosition="right" animated striped />

// 3. Progress bar with progress text hidden and percentage shown outside on the right
// <ProgressBarComponent progress={90} percentagePosition="right" />

// 4. Progress bar with custom class names for styling
// <ProgressBarComponent
//    progress={65}
//    className="myProgressBarWrapper"
//    trackClassName="myTrackClass"
//    progressClassName="myFillClass"
//    textClassName="myTextClass"
//    striped
//    animated
// />

// 5. Button Starts the progress animation with stripes onClick
// 
// const [progress, setProgress] = useState(0);
// 
// const handleProgressComponentStart = () => {
//     setProgress(0);
//     const duration = 10000; // 10 seconds
//     const startTime = performance.now();
// 
//     const updateProgress = (currentTime: number) => {
//         const elapsedTime = currentTime - startTime;
//         const newProgress = Math.floor((elapsedTime / duration) * 100);
//         setProgress(newProgress);
// 
//         if (newProgress < 100) {
//             requestAnimationFrame(updateProgress);
//         }
//     };
// 
//     requestAnimationFrame(updateProgress);
// };
// 
// <section>
//     <h3>Interactive Progress Bar Example</h3>
//     <ButtonComponent label="Start" onClick={handleProgressComponentStart} />
// 
//     <ProgressBarComponent
//     progress={progress}
//     progressText="Downloading something maybe"
//     progressTextPosition="bottom"
//     percentagePosition="inside"
//     striped
//     animated
//     />
// </section>

// 6. Sync the progress bar to a real example with fetch(I have never tried this so i don't know how it works)
// 
// const [progress, setProgress] = useState(0);
// 
// const handleDownload = async (url: string, filename: string) => {
//     setProgress(0); // Reset progress
// 
//     try {
//         const response = await fetch(url);
//         
//         if (!response.ok) {
//             throw new Error(`Failed to download: ${response.statusText}`);
//         }
// 
//         const contentLength = response.headers.get("content-length");
//         const totalBytes = contentLength ? parseInt(contentLength) : 0;
// 
//         const reader = response.body?.getReader();
//         if (!reader) {
//             throw new Error("No readable stream available");
//         }
// 
//         let receivedBytes = 0;
//         let chunks: Uint8Array[] = [];
// 
//         while (true) {
//             const { done, value } = await reader.read();
//             if (done) break;
// 
//             chunks.push(value);
//             receivedBytes += value.length;
// 
//             // Update progress (if totalBytes is known)
//             if (totalBytes > 0) {
//                 const newProgress = Math.round((receivedBytes / totalBytes) * 100);
//                 setProgress(newProgress);
//             }
//         }
// 
//         const blob = new Blob(chunks);
//         const downloadUrl = window.URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = downloadUrl;
//         link.download = filename;
//         link.click();
// 
//         // Clean up
//         window.URL.revokeObjectURL(downloadUrl);
//         setProgress(100); // Ensure 100% at the end
//     } catch (error) {
//         console.error("Download failed:", error);
//         setProgress(0); // Reset on error
//     }
// };
// 
// <ButtonComponent 
//     label="Download File" 
//     onClick={() => handleDownload("https://example.com/file.zip", "file.zip")} 
// />
// <ProgressBarComponent
//     progress={progress}
//     progressText="Downloading file.zip"
//     progressTextPosition="bottom"
//     percentagePosition="inside"
//     striped
//     animated
// />

*/