import React, { useEffect, useState, } from 'react';
import style from './basic.module.css';
import { FaCheck, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa'; // Import react-icons


// This is a alert / notification component which is meant to replace the browser alert
// With this we can customize it and use however and where ever we like
// In this component we also start using react-icons, which is a icon library 
// One thing to note tho is that is seems to be very unstable at the moment, at least for me
// So i needed to create a new react-icons.d.ts file and declare each icon used
// I tried to solve this problem with looking for answers on github and stack overflow but nothing worked
// Eventually i manged to solve it with AI help
// So this works for now but probably better to just make ur own icons or use any other library e

// Union types
type AlertNotificationType = "success" | "error" | "warning" | "info";
type Position = "topRight" | "bottomRight" | "topLeft" | "bottomLeft" | "center" | "topCenter" | "bottomCenter";

// Component props
interface AlertNotificationProps {
    type: AlertNotificationType;
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
const AlertNotificationComponent: React.FC<AlertNotificationProps> = ({
    type = "info",
    position = "topCenter",
    title = "Notification",
    message,
    duration = 3000,
    onClose,
    onAction,
    actionLabel = "Action",
    className = ""
}) => {
    // Use state to set visible or not
    const [isVisible, setIsVisible] = useState<boolean>(true);

    // Set icon and style on alert type with react record utility 
    const getIcon: Record<AlertNotificationType, React.ReactNode> = {
        success: <FaCheck className={style.alertNotificationIconSuccess} />,
        error: <FaTimes className={style.alertNotificationIconError} />,
        warning: <FaExclamationTriangle className={style.alertNotificationIconWarning} />,
        info: <FaInfoCircle className={style.alertNotificationIconInfo} />
    };

    // Set position with react record utility 
    const getPositionClass: Record<Position, string> = {
        topRight: `${style.alertNotificationTopRight} ${className}`,
        bottomRight: `${style.alertNotificationBottomRight} ${className}`,
        topLeft: `${style.alertNotificationTopLeft} ${className}`,
        bottomLeft: `${style.alertNotificationBottomLeft} ${className}`,
        center: `${style.alertNotificationCenter} ${className}`,
        topCenter: `${style.alertNotificationTopCenter} ${className}`,
        bottomCenter: `${style.alertNotificationBottomCenter} ${className}`,
    };

    // Use effect which makes sure component closes after x duration
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose?.();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    // And if its not already visible return nothing
    if (!isVisible) return null;

    // Returns a alert / notification card with position, wrapper, header, icon, title, etc...
    return (
        <div className={`${getPositionClass[position]} ${style.alertNotificationWrapper}`}>
            <div className={style.alertNotificationHeader}>
                <div className={style.alertNotificationTitleContainer}>
                    {getIcon[type]}
                    <h3 className={style.alertNotificationTitle}>{title}</h3>
                </div>
                <button
                    className={style.alertNotificationCloseButton}
                    onClick={() => {
                        setIsVisible(false);
                        onClose?.();
                    }}
                    aria-label="Close notification"
                >
                    <FaTimes />
                </button>
            </div>
            <div className={style.alertNotificationBody}>
                <p className={style.alertNotificationMessage}>{message}</p>
            </div>
            <div className={style.alertNotificationFooter}>
                {onAction && ( // optional on action button that change style depending on set type
                    <button 
                        className={`${style.alertNotificationActionButton} ${style[`alertNotificationActionButton${type.charAt(0).toUpperCase() + type.slice(1)}`]}`}
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
                    className={style.alertNotificationOkButton}
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

export default AlertNotificationComponent;

/*

USAGE EXAMPLES:

// 1. Simple info alert that disappears after 3 seconds automatically:
// <AlertNotificationComponent
//   type="info"
//   position="topCenter"
//   title="Information"
//   message="This is an informational message."
// />

// 2. Success alert that stays visible for 5 seconds:
// <AlertNotificationComponent
//   type="success"
//   position="bottomRight"
//   title="Success!"
//   message="Your operation was successful."
//   duration={5000}
// />

// 3. Error alert with manual close and custom onClose handler:
// <AlertNotificationComponent
//   type="error"
//   position="topRight"
//   title="Error!"
//   message="Something went wrong."
//   onClose={() => console.log('Error alert closed')}
// />

// 4. Warning alert with an action button that triggers a callback:
// <AlertNotificationComponent
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
// <AlertNotificationComponent
//   type="info"
//   position="bottomCenter"
//   title="Note"
//   message="Please read this important note."
//   duration={0}
// />

*/