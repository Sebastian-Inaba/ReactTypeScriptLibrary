import React, { useState } from 'react';
import style from './ToastNotification.module.css';

// toast notification component

//WIP

interface ToastNotificationProps {
    message: string;
    duration: number;
    onTrigger?: () => void;
    className?: string;
    icon?: React.ReactNode;
}

export const ToastNotificationComponent: React.FC<ToastNotificationProps> = ({
    message = '',
    duration = null,
    onTrigger,
    className = '',
    icon = null,
}) => {
    const [isVisible, setIsVisible] = React.useState<boolean>(false);

    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const showNotification = () => {
        setIsVisible(true);
        onTrigger?.();
        if (duration) {
            const newTimer = setTimeout(() => {
                setIsVisible(false);
            }, duration);
            setTimer(newTimer);
        }
    };

    return (
        <div>
            {isVisible && (
                <div>
                    {icon && <span className={style.icon}>{icon}</span>}
                    <span className={style.message}>{message}</span>
                    <button
                        className={style.closeButton}
                        onClick={() => {
                            setIsVisible(false);
                            if (timer) {
                                clearTimeout(timer);
                                setTimer(null);
                            }
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
            ;
        </div>
    );
};
