import React, { useState, useEffect, useRef } from "react";
import style from "./ToastNotification.module.css";

interface ToastNotificationProps {
    message: string;
    duration?: number;
    onClick?: () => void;  
    className?: string;
    icon?: React.ReactNode;
}

export const ToastNotificationComponent: React.FC<ToastNotificationProps> = ({
    message = "",
    duration,
    onClick,                
    className = "",
    icon = null,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setIsVisible(true);

        if (duration) {
            timerRef.current = setTimeout(() => {
                setIsVisible(false);
                onClick?.(); 
            }, duration * 1000);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [duration, onClick]);

    return (
        <>
            {isVisible && (
                <div className={`${style.ToastNotificationComponentWrapper} ${className}`}>
                    {icon && <span className={style.ToastNotificationComponentIcon}>{icon}</span>}
                    <span className={style.ToastNotificationComponentMessage}>{message}</span>
                    <button
                        className={style.ToastNotificationComponentButton}
                        aria-label="Close notification"
                        onClick={() => {
                            setIsVisible(false);
                            if (timerRef.current) clearTimeout(timerRef.current);
                            onClick?.(); 
                        }}
                    >
                        X
                    </button>
                </div>
            )}
        </>
    );
};

/*

USE EXAMPLE:

// 1. Basic toast:
// <ToastNotificationComponent
//     message="This is a basic toast!"       
//     duration={3}                           
//     onClick={() => console.log("Toast closed")} 
// />

// 2. Toast with icon
// <ToastNotificationComponent
//     message="Success! Action completed."
//     duration={5}                           
//     onClick={() => console.log("Toast closed")}
//     icon={<span>✅</span>}                 
// />

// 3. Toast for error or warning with custom class
// <ToastNotificationComponent
//     message="Error: Something went wrong!"
//     duration={6}                             
//     onClick={() => console.log("Error toast closed")}
//     icon={<span>⚠️</span>}                   
//     className="error-toast"                  
// />

// 4. Success toast with custom styling
// <ToastNotificationComponent
//     message="Data saved successfully!"
//     duration={4}
//     onClick={() => console.log("Success toast closed")}
//     icon={<span>🎉</span>}
//     className="success-toast"
// />

*/