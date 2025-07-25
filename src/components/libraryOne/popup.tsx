import { useEffect } from 'react';
import style from './basic.module.css';

// Popup props
interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

// Disable background use while popup is open
function useDisableBodyScroll(isOpen: boolean) {
    useEffect(() => {
        if (isOpen) {
        document.body.style.overflow = 'hidden';  
        } else {
        document.body.style.overflow = '';        
        }
        return () => {
        document.body.style.overflow = '';        
        };
    }, [isOpen]);
}

// Popup Component 
const PopupComponent: React.FC<PopupProps> = ({
    isOpen,
    onClose,
    title,
    message
}) => {
    // Call function when open
    useDisableBodyScroll(isOpen);

    if (!isOpen) return null;

    return (
        <div className={style.popupOverlayComponent}>
        <div className={`${style.popupContentWrapper} ${style.cardComponentImage}`}>
            <h2 className={style.popupTitleComponent}>{title}</h2>
            <div className={style.popupBodyComponent}>
            {message}
            </div>
            <button className={style.popupCloseButtonComponent} onClick={onClose}>
            Close
            </button>
        </div>
        </div>
    );
};

export default PopupComponent;

/*

USAGE EXAMPLES:

// 1. Basic usage with open/close controlled from parent component:
// const ParentComponent = () => {
//   const [popupOpen, setPopupOpen] = React.useState(false);
// 
//   return (
//     <>
//       <button onClick={() => setPopupOpen(true)}>Open Popup</button>
//       <PopupComponent
//         isOpen={popupOpen}
//         onClose={() => setPopupOpen(false)}
//         title="Hello!"
//         message="This is a simple popup message."
//       />
//     </>
//   );
// };

// 2. Popup showing important info before user proceeds:
// <PopupComponent
//   isOpen={isInfoOpen}
//   onClose={() => setIsInfoOpen(false)}
//   title="Terms and Conditions"
//   message="Please read and accept the terms before continuing."
// />

// 3. Popup used as an alert or confirmation dialog:
// <PopupComponent
//   isOpen={showConfirm}
//   onClose={() => setShowConfirm(false)}
//   title="Confirm Delete"
//   message="Are you sure you want to delete this item?"
// />

// 4. Popup with long text message scrollable inside the popup body:
// <PopupComponent
//   isOpen={showLongMessage}
//   onClose={() => setShowLongMessage(false)}
//   title="Privacy Policy"
//   message={
//     <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
//       // long content here 
//     </div>
//   }
// />

*/