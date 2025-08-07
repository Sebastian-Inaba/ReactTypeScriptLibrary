import React, { useEffect, useState } from 'react';
import style from './ProgressBar.module.css';

// ProgressBar component

type Position = 'top' | 'bottom' | 'left' | 'right' | 'inside' | 'none';

interface ProgressBarProps {
    progress: number;
    progressText?: string;
    progressTextPosition?: Position;
    percentagePosition?: Position;
    className?: string;
    striped?: boolean; // striped style
    animated?: boolean; // animated style
}

export const ProgressBarComponent: React.FC<ProgressBarProps> = ({
    progress,
    progressText = '',
    progressTextPosition = 'none',
    percentagePosition = 'inside',
    className = '',
    striped = false,
    animated = false,
}) => {
    const [currentProgress, setCurrentProgress] = useState(0);

    // Animate the progress bar
    useEffect(() => {
        let frameId: number;
        const step = () => {
            setCurrentProgress((prev) => {
                if (prev < progress) {
                    frameId = requestAnimationFrame(step);
                    return Math.min(prev + 1, progress);
                }
                return prev;
            });
        };
        step();
        return () => cancelAnimationFrame(frameId);
    }, [progress]);

    const percentageText = `${currentProgress}%`;

    // Class names for the progress fill options
    const progressFillClass = [
        style.ProgressBarComponentProgressFill,
        striped ? style.ProgressBarComponentStriped : '',
        animated ? style.ProgressBarComponentAnimated : '',
    ]
        .filter(Boolean) // Filter out any empty strings
        .join(' '); // Join class names with a space

    // Render the text with the appropriate class
    const renderText = (text: string) => <span className={style.ProgressBarComponentText}>{text}</span>;

    // Positioning with react DOM, this is a bit cluttered so using react Record or switch might be better
    return (
        <div className={`${style.ProgressBarComponentWrapper} ${className}`}>
            {(progressTextPosition === 'top' || percentagePosition === 'top') && (
                <div className={style.ProgressBarComponentTopBottomPosition}>
                    {progressTextPosition === 'top' && renderText(progressText)}
                    {percentagePosition === 'top' && renderText(percentageText)}
                </div>
            )}

            <div className={style.ProgressBarComponentMainRow}>
                {(progressTextPosition === 'left' || percentagePosition === 'left') && (
                    <div className={style.ProgressBarComponentSidePosition}>
                        {progressTextPosition === 'left' && renderText(progressText)}
                        {percentagePosition === 'left' && renderText(percentageText)}
                    </div>
                )}

                <div
                    className={style.ProgressBarComponentTrack}
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={currentProgress}
                    aria-label={progressText || `Progress: ${percentageText}`}
                >
                    <div className={progressFillClass} style={{ width: `${currentProgress}%` }} />
                    {percentagePosition === 'inside' && <span className={style.ProgressBarComponentCenteredText}>{percentageText}</span>}
                    {progressTextPosition === 'inside' && <span className={style.ProgressBarComponentCenteredText}>{progressText}</span>}
                </div>

                {(progressTextPosition === 'right' || percentagePosition === 'right') && (
                    <div className={style.ProgressBarComponentSidePosition}>
                        {progressTextPosition === 'right' && renderText(progressText)}
                        {percentagePosition === 'right' && renderText(percentageText)}
                    </div>
                )}
            </div>

            {(progressTextPosition === 'bottom' || percentagePosition === 'bottom') && (
                <div className={style.ProgressBarComponentTopBottomPosition}>
                    {progressTextPosition === 'bottom' && renderText(progressText)}
                    {percentagePosition === 'bottom' && renderText(percentageText)}
                </div>
            )}
        </div>
    );
};

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
