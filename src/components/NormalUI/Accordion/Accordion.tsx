import React, { useState, useEffect } from 'react';
import style from './Accordion.module.css';

interface AccordionProps {
    title: string;
    content: React.ReactNode;
    isOpen?: boolean;
    onToggle?: (isOpen: boolean) => void;
    className?: string;
    icon?: React.ReactNode;
}

export const AccordionComponent: React.FC<AccordionProps> = ({ title, content, isOpen = false, onToggle, className = '', icon = null }) => {
    const [isOpenState, setIsOpenState] = useState<boolean>(isOpen);
    const contentId = `accordion-content-${React.useId()}`; // Unique id for html and browser accessibility between header and content

    useEffect(() => {
        setIsOpenState(isOpen);
    }, [isOpen]);

    const handleToggle = () => {
        const newState = !isOpenState;
        setIsOpenState(newState);
        onToggle?.(newState);
    };

    return (
        <div
            className={`${style.AccordionComponentWrapper} ${className} ${isOpenState ? style.AccordionComponentOpen : ''}`}
            aria-expanded={isOpenState}
        >
            <button className={style.AccordionComponentHeader} onClick={handleToggle} aria-controls={contentId} aria-expanded={isOpenState}>
                <div className={style.AccordionComponentHeaderContent}>
                    {icon && <span className={style.AccordionComponentIcon}>{icon}</span>}
                    <span className={style.AccordionComponentTitle}>{title}</span>
                </div>
                <span className={style.AccordionComponentToggleIcon}>{isOpenState ? '-' : '+'}</span>
            </button>
            <div
                id={contentId}
                className={`${style.AccordionComponentContent} ${isOpenState ? style.AccordionComponentShow : style.AccordionComponentHide}`}
                aria-hidden={!isOpenState}
            >
                {content}
            </div>
        </div>
    );
};

/*

USAGE EXAMPLE:

// 1. Basic accordion with plain text content:
// <AccordionComponent 
//   title="What is your return policy?" 
//   content="You can return any item within 30 days of purchase." 
// />

// 2. Accordion with a custom icon:
// <AccordionComponent 
//   title="Shipping Details" 
//   icon={<TruckIcon />} 
//   content="Free shipping for orders over $50. Delivered in 3–5 days." 
// />

// 3. Accordion with a React component as content:
// const ProfileInfo = () => (
//   <div>
//     <p><strong>Name:</strong> Jane Doe</p>
//     <p><strong>Email:</strong> jane@example.com</p>
//   </div>
// );
// 
// <AccordionComponent 
//   title="User Profile" 
//   content={<ProfileInfo />} 
// />

// 4. Controlled accordion (external state manages open/close):
// const [isFaqOpen, setIsFaqOpen] = React.useState(false);
// 
// <AccordionComponent 
//   title="FAQ: Can I cancel my subscription?" 
//   isOpen={isFaqOpen} 
//   onToggle={(open) => setIsFaqOpen(open)} 
//   content="Yes, you can cancel at any time from your account settings." 
// />

// 5. Accordion list rendered from dynamic data (e.g. FAQ):
// const faqs = [
//   { title: "How do I sign up?", content: "Just click the Sign Up button." },
//   { title: "Is it free?", content: "Yes, our basic plan is completely free." },
// ];
// 
// {faqs.map((item, idx) => (
//   <AccordionComponent 
//     key={idx} 
//     title={item.title} 
//     content={item.content} 
//   />
// ))}

// 6. Accordion with rich JSX content and interactive elements:
// const SettingsContent = () => (
//   <div>
//     <p>2FA is currently <strong>enabled</strong>.</p>
//     <button onClick={handleDisable2FA}>Disable 2FA</button>
//   </div>
// );
// 
// <AccordionComponent 
//   title="Security Settings" 
//   content={<SettingsContent />} 
// />

// 7. Accordion with extra styling using className prop:
// <AccordionComponent 
//   title="Styled Section" 
//   className="myCustomAccordion" 
//   content="This accordion uses an additional custom class for styling." 
// />

*/
