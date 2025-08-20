import React, { useEffect, useState } from 'react';
import style from './Alert.module.css';
import { FaCheck, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa'; // Import react-icons

// Alert component

// Using react-icons, which is a icon library
// Note: It is that is very unstable at the moment, i needed to create a new react-icons.d.ts file and declare each icon used
// I tried to solve this problem with looking for answers on github and stack overflow but nothing worked

type AlertType = 'success' | 'error' | 'warning' | 'info';
type Position = 'topRight' | 'bottomRight' | 'topLeft' | 'bottomLeft' | 'center' | 'topCenter' | 'bottomCenter';

interface AlertProps {
    type: AlertType;
    position: Position;
    title: string;
    message: string;
    duration?: number;
    onClose?: () => void;
    onAction?: () => void;
    actionLabel?: string;
    className?: string;
}

// Component with react type checking
export const AlertComponent: React.FC<AlertProps> = ({
    type = 'info',
    position = 'topCenter',
    title = 'Alert',
    message,
    duration,
    onClose,
    onAction,
    actionLabel = 'Action',
    className = '',
}) => {
    // Use state to set visible or not
    const [isVisible, setIsVisible] = useState<boolean>(true);

    // Set icon and style on alert type with react record utility
    const getIcon: Record<AlertType, React.ReactNode> = {
        success: <FaCheck className={style.AlertComponentIconSuccess} />,
        error: <FaTimes className={style.AlertComponentIconError} />,
        warning: <FaExclamationTriangle className={style.AlertComponentIconWarning} />,
        info: <FaInfoCircle className={style.AlertComponentIconInfo} />,
    };

    // Set position with react record utility
    const getPositionClass: Record<Position, string> = {
        topRight: `${style.AlertComponentTopRightPosition} ${className}`,
        bottomRight: `${style.AlertComponentBottomRightPosition} ${className}`,
        topLeft: `${style.AlertComponentTopLeftPosition} ${className}`,
        bottomLeft: `${style.AlertComponentBottomLeftPosition} ${className}`,
        center: `${style.AlertComponentCenterPosition} ${className}`,
        topCenter: `${style.AlertComponentTopCenterPosition} ${className}`,
        bottomCenter: `${style.AlertComponentBottomCenterPosition} ${className}`,
    };

    // Use effect which makes sure component closes after x duration
    useEffect(() => {
        if (typeof duration === "number" && duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose?.();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);


    // And if its not already visible return nothing
    if (!isVisible) return null;

    // Returns a alert with position, wrapper, header, icon, title, etc...
    return (
        <div className={`${getPositionClass[position]} ${style.AlertComponentWrapper}`}>
            <div className={style.AlertComponentHeader}>
                <div className={style.AlertComponentTitleContainer}>
                    {getIcon[type]}
                    <h3 className={style.AlertComponentTitle}>{title}</h3>
                </div>
                <button
                    className={style.AlertComponentCloseButton}
                    onClick={() => {
                        setIsVisible(false);
                        onClose?.();
                    }}
                    aria-label="Close alert"
                >
                    <FaTimes />
                </button>
            </div>
            <div className={style.AlertComponentBody}>
                <p className={style.AlertComponentMessage}>{message}</p>
            </div>
            <div className={style.AlertComponentFooter}>
                {onAction && ( // optional on action button that change style depending on set type
                    <button
                        className={`${style.AlertComponentActionButton} ${style[`AlertComponentActionButton${type.charAt(0).toUpperCase() + type.slice(1)}`]}`}
                        onClick={() => {
                            onAction();
                            setIsVisible(false);
                            onClose?.();
                        }}
                    >
                        {actionLabel}
                    </button>
                )}
                <button
                    className={style.AlertComponentOkButton}
                    onClick={() => {
                        setIsVisible(false);
                        onClose?.();
                    }}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

/*

USAGE EXAMPLES:

// 1. Simple info alert that disappears after 3 seconds automatically:
// <AlertComponent
//   type="info"
//   position="topCenter"
//   title="Information"
//   message="This is an informational message."
// />

// 2. Success alert that stays visible for 5 seconds:
// <AlertComponent
//   type="success"
//   position="bottomRight"
//   title="Success!"
//   message="Your operation was successful."
//   duration={5000}
// />

// 3. Error alert with manual close and custom onClose handler:
// <AlertComponent
//   type="error"
//   position="topRight"
//   title="Error!"
//   message="Something went wrong."
//   onClose={() => console.log('Error alert closed')}
// />

// 4. Warning alert with an action button that triggers a callback:
// <AlertComponent
//   type="warning"
//   position="center"
//   title="Warning!"
//   message="Are you sure you want to delete this item?"
//   onAction={() => { 
//     console.log('Delete confirmed'); 
//     // deletion logic 
//   }}
//   actionLabel="Delete"
// />

// 5. Info alert with no auto close (duration=0), so it stays until user closes it:
//<AlertComponent
//  type="info"
//  position="bottomCenter"
//  title="Note"
//  message="Please read this important note."
//  duration={0}
///>

*/
