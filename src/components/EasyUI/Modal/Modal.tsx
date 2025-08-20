import { useEffect } from 'react';
import style from './Modal.module.css';

// Modal component

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

// Disable background use while modal is open
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

export const ModalComponent: React.FC<ModalProps> = ({ 
    isOpen, 
    onClose, 
    title, 
    message,
}) => {
    useDisableBodyScroll(isOpen);

    if (!isOpen) return null;

    return (
        <div className={style.ModalComponentOverlay}>
            <div className={`${style.ModalComponentWrapper} ${style.CardComponentImage}`}>
                <h2 className={style.ModalComponentTitle}>{title}</h2>
                <div className={style.ModalComponentBody}>{message}</div>
                <button className={style.ModalComponentCloseButton} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

/*

USAGE EXAMPLES:

// 1. Basic usage with open/close controlled from parent component:
// const ParentComponent = () => {
//   const [modalOpen, setModalOpen] = React.useState(false);
//
//   return (
//     <>
//       <button onClick={() => setModalOpen(true)}>Open Modal</button>
//       <ModalComponent
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title="Hello!"
//         message="This is a simple modal message."
//       />
//     </>
//   );
// };

// 2. Modal showing important info before user proceeds:
// <ModalComponent
//   isOpen={isInfoOpen}
//   onClose={() => setIsInfoOpen(false)}
//   title="Terms and Conditions"
//   message="Please read and accept the terms before continuing."
// />

// 3. Modal used as an alert or confirmation dialog:
// <ModalComponent
//   isOpen={showConfirm}
//   onClose={() => setShowConfirm(false)}
//   title="Confirm Delete"
//   message="Are you sure you want to delete this item?"
// />

// 4. Modal with long text message scrollable inside the modal body:
// <ModalComponent
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
